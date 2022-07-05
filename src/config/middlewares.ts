import { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";

const middlewares = (app: Application) => {
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
};

export default middlewares;
