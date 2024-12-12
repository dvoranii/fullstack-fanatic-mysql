import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { sanitizeInput } from "../utils/sanitizationUtils";

export const sanitizeAndValidate = (rules: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    Object.keys(req.body).forEach((key) => {
      req.body[key] = sanitizeInput(req.body[key]);
    });

    await Promise.all(rules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
};
