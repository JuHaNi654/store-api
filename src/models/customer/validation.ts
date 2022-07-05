import { NextFunction, Request, Response } from "express";
import { BaseCustomer, CustomerId } from "./customer";

export const validateCustomer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = BaseCustomer.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues,
    });
  }

  return next();
};

export const validateCustomerId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerId = Number(req.params.customerId);
  const result = CustomerId.safeParse({ customerId });

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues,
    });
  }

  res.locals.customerId = customerId;
  return next();
};
