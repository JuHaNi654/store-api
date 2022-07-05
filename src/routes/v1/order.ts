import { Router, Request, Response } from "express";
import { validateOrder, validateOrderId } from "../../models/order/validation";
import orderRepository from "../../models/order/orderRepository";
import productRepository from "../../models/product/productRepository";
import productUtils from "../../models/product/utils";
import { handlePrismaErrors } from "../../error/database";
import { Prisma } from "@prisma/client";

const router: Router = Router();

/**
 * @Route - /orders/
 * @Description - Get list of orders
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const orders = await orderRepository.findAll();
    return res.status(200).json({
      orders,
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
 * @Route - /orders/:orderId
 * @Description - Update order by order id
 */
router.patch(
  "/:orderId",
  [validateOrderId],
  async (req: Request, res: Response) => {
    try {
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
 * @Route - /orders/
 * @Description - Create new order
 */
router.post("/", [validateOrder], async (req: Request, res: Response) => {
  const errors: Array<unknown> = [];
  try {
    const { products } = req.body;

    for (let i = 0; i < products.length; i++) {
      const orderItem = products[i];
      const { result, error } = await productUtils.checkStock(orderItem);

      if (error === null) {
        const { productId, ...values } = result;
        await productRepository.update(productId, values);
      } else {
        errors.push(error);
      }
    }

    if (errors.length !== 0) {
      return res.status(400).json({
        errors,
      });
    }

    const order = await orderRepository.create(req.body);
    return res.status(201).json({
      order,
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
 * @Route - /orders/:orderId
 * @Description - Get order by order id
 */
router.get(
  "/:orderId",
  [validateOrderId],
  async (req: Request, res: Response) => {
    try {
      const orders = await orderRepository.findById(res.locals.orderId);
      return res.status(200).json({
        orders,
      });
    } catch (err: any) {
      console.log(err);

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
 * @Route - /orders/:orderId
 * @Description - Delete order by id
 */
router.delete(
  "/:orderId",
  [validateOrderId],
  async (req: Request, res: Response) => {
    try {
      const orderItems = await orderRepository.getOrderItems(
        res.locals.orderId
      );
      for (let i = 0; i < orderItems.length; i++) {
        const { product, ...item } = orderItems[i];
        product.stock += item.quantity;
        await productRepository.update(item.productId, product);
      }

      await orderRepository.delete(res.locals.orderId);
      return res.status(204).json();
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

export default router;
