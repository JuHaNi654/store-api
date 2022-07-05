import { Router, Application } from "express";

import customerV1 from "../routes/v1/customer";
import productV1 from "../routes/v1/product";
import orderV1 from "../routes/v1/order";

const PREFIX_V1 = "/api/V1";

const routes: Array<[string, Router]> = [
  ["/customers", customerV1],
  ["/products", productV1],
  ["/orders", orderV1],
];

export const initRoutesV1 = (app: Application) => {
  routes.forEach(([path, router]) => {
    app.use(PREFIX_V1 + path, router);
  });
};
