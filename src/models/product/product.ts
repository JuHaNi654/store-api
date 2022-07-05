import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const ProductId = z.object({
  productId: z.number({
    required_error: "Product id is required",
    invalid_type_error: "Product id must be a number",
  }),
});

export const BaseProduct = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a number",
  }),
  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }),
  stock: z.number({
    required_error: "Stock is required",
    invalid_type_error: "Stock must be a number",
  }),
});

export const Product = ProductId.merge(BaseProduct);
export type IProduct = z.infer<typeof Product>;
export type IBaseProduct = z.infer<typeof BaseProduct>;
