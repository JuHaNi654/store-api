import { Router, Request, Response } from "express";
import {
  validateCustomer,
  validateCustomerId,
} from "../../models/customer/validation";
import customerRepository from "../../models/customer/customerRepository";
import { handlePrismaErrors } from "../../error/database";
import { Prisma } from "@prisma/client";

const router: Router = Router();

/**
 * @Route - /customers/
 * @Description - Get list of customers
 */
router.get("/", async (_: Request, res: Response) => {
  try {
    const customers = await customerRepository.findAll();
    return res.status(200).json({
      customers,
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
});

/**
 * @Route - /customers/
 * @Description - Save new customer
 */
router.post("/", [validateCustomer], async (req: Request, res: Response) => {
  try {
    const customer = await customerRepository.create(req.body);
    return res.status(201).json({
      customer,
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
 * @Route - /customers/:customerId
 * @Description - Get single customer
 */
router.get(
  "/:customerId",
  [validateCustomerId],
  async (_: Request, res: Response) => {
    try {
      const customer = await customerRepository.findById(res.locals.customerId);
      if (customer === null) {
        return res.status(404).json({
          message: "Not found",
        });
      }

      return res.status(200).json({
        customer,
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
 * @Route - /customers/:customerId
 * @Description - Update customer by customerId
 */
router.patch(
  "/:customerId",
  [validateCustomerId, validateCustomer],
  async (req: Request, res: Response) => {
    try {
      const customer = await customerRepository.update(
        res.locals.customerId,
        req.body
      );
      return res.status(200).json({
        customer,
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
 * @Route - /customers/:customerId
 * @Description - Delete customer by customerId
 */
router.delete(
  "/:customerId",
  [validateCustomerId],
  async (_: Request, res: Response) => {
    try {
      await customerRepository.delete(res.locals.customerId);
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
