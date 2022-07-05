import { Router, Request, Response } from "express";
import {
  validateProduct,
  validateProductId,
} from "../../models/product/validation";
import productRepository from "../../models/product/productRepository";
import { handlePrismaErrors } from "../../error/database";
import { Prisma } from "@prisma/client";

const router: Router = Router();

/**
 * @Route - /products/
 * @Description - Get list of products
 */
router.get("/", async (_: Request, res: Response) => {
  try {
    const products = await productRepository.findAll();

    return res.status(200).json({
      products,
    });
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      const error = handlePrismaErrors(err);
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

/**
 * @Route - /products/
 * @Description - Add new product
 */
router.post("/", [validateProduct], async (req: Request, res: Response) => {
  try {
    const product = await productRepository.create(req.body);
    return res.status(201).json({
      product,
    });
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      const error = handlePrismaErrors(err);
      return res.status(error.statusCode).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

/**
 * @Route - /products/:productId
 * @Description - Get single product
 */
router.get(
  "/:productId",
  [validateProductId],
  async (_: Request, res: Response) => {
    try {
      const product = await productRepository.findById(res.locals.productId);

      if (product === null) {
        return res.status(404).json({
          message: "Not found",
        });
      }

      return res.status(200).json({
        product,
      });
    } catch (err: any) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const error = handlePrismaErrors(err);
        return res.status(error.statusCode).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Something went wrong!",
      });
    }
  }
);

/**
 * @Route - /products/:productId
 * @Description - Update product
 */
router.patch(
  "/:productId",
  [validateProductId, validateProduct],
  async (req: Request, res: Response) => {
    try {
      const product = await productRepository.update(
        res.locals.productId,
        req.body
      );

      return res.status(200).json({
        product,
      });
    } catch (err: any) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const error = handlePrismaErrors(err);
        return res.status(error.statusCode).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Something went wrong!",
      });
    }
  }
);

/**
 * @Route - /products/:productId
 * @Description - Delete product
 */
router.delete(
  "/:productId",
  [validateProductId],
  async (_: Request, res: Response) => {
    try {
      await productRepository.delete(res.locals.productId);
      return res.status(204).json();
    } catch (err: any) {
      console.error(err);
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const error = handlePrismaErrors(err);
        return res.status(error.statusCode).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Something went wrong!",
      });
    }
  }
);

export default router;
