import { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";

export default function security(app: Application): void {
  const isProduction =
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging";

  app.use(helmet());

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("X-Frame-Options", "DENY");
    if (req.headers["user-agent"]?.includes("MSIE ")) {
      res.write(
        "<script>if (window.top !== window.self) { window.top.location = window.self.location; }</script>"
      );
    }
    next();
  });

  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://www.google.com/recaptcha/"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        ...(isProduction && { upgradeInsecureRequests: [] }),
      },
    })
  );

  app.use(helmet.xssFilter());

  if (isProduction) {
    app.use(
      helmet.hsts({
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      })
    );
  }

  app.use(helmet.referrerPolicy({ policy: "no-referrer" }));

  app.use((req, res, next) => {
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    next();
  });
}
