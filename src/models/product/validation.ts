import { NextFunction, Request, Response } from "express";
import { BaseProduct, ProductId } from "./product";

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = BaseProduct.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues,
    });
  }

  return next();
};

export const validateProductId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = Number(req.params.productId);
  const result = ProductId.safeParse({ productId });

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues,
    });
  }

  res.locals.productId = productId;
  return next();
};
