import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

const dataDirPath = path.join(__dirname, "../data");
const blacklistFilePath = path.join(dataDirPath, "blacklisted_ips.txt");

if (!fs.existsSync(dataDirPath)) {
  fs.mkdirSync(dataDirPath);
}

if (!fs.existsSync(blacklistFilePath)) {
  fs.writeFileSync(blacklistFilePath, "", "utf-8");
  console.log(`Created ${blacklistFilePath}`);
}

const blacklistedIPs = new Set<string>();

if (fs.existsSync(blacklistFilePath)) {
  const fileContent = fs.readFileSync(blacklistFilePath, "utf-8");
  fileContent.split("\n").forEach((ip) => {
    if (ip.trim()) blacklistedIPs.add(ip.trim());
  });
}

const addToBlacklist = (ip: string) => {
  if (!blacklistedIPs.has(ip)) {
    blacklistedIPs.add(ip);
    fs.appendFileSync(blacklistFilePath, `${ip}\n`);
    console.warn(`IP ${ip} added to blacklist.`);
  }
};

const detectSuspiciousInput = (value: string): boolean => {
  const suspiciousPatterns =
    /(<script>|<\/script>|&lt;|&gt;|javascript:|onerror=|onload=)/i;
  return suspiciousPatterns.test(value);
};

export const blacklist = (req: Request, res: Response, next: NextFunction) => {
  const userIP = req.ip || "unknown";

  if (blacklistedIPs.has(userIP)) {
    console.warn(`Access denied for blacklisted IP: ${userIP}`);
    return res.status(403).json({ error: "Access denied." });
  }

  const { fullName, email, message, name } = req.body;

  if (
    detectSuspiciousInput(fullName || "") ||
    detectSuspiciousInput(email || "") ||
    detectSuspiciousInput(message || "") ||
    detectSuspiciousInput(name || "")
  ) {
    console.warn(`Suspicious input detected from IP: ${userIP}`);
    addToBlacklist(userIP);
    return res.status(400).json({ error: "Suspicious input detected." });
  }

  next();
};
