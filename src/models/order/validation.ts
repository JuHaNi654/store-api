import { NextFunction, Request, Response } from "express";
import { BaseOrder, OrderId } from "./order";

export const validateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await BaseOrder.safeParseAsync(req.body);
  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues,
    });
  }

  return next();
};

export const validateUpdatedOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = OrderId.safeParse({ orderId: req.params.orderId });
  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues,
    });
  }

  res.locals.orderId = req.params.orderId;
  return next();
};

export const validateOrderId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = OrderId.safeParse({ orderId: req.params.orderId });
  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues,
    });
  }

  res.locals.orderId = req.params.orderId;
  return next();
};
