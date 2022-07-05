require("dotenv").config();
import express, { Request, Response, NextFunction, Errback } from "express";
import { prisma } from "./config/prisma";

// Config
import { initRoutesV1 } from "./config/routes";
import middlewares from "./config/middlewares";

const app: express.Express = express();
const PORT = process.env.PORT || 5000;

const main = async () => {
  middlewares(app);
  initRoutesV1(app);

  app.get("/", (_: Request, res: Response) => {
    return res.status(200).json({
      msg: "Hello world",
    });
  });

  app.use((_: Request, res: Response, next) => {
    return res.status(404).json({
      message: "Invalid route!",
    });
  });

  app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({
      message: "Something went wrong!",
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

main()
  .catch((err) => {
    console.error("Something went wrong");
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
