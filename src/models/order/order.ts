import { z } from "zod";

export const OrderStatus = z.enum(["PENDING", "SEND", "RECEIVED"]);

export const BaseOrder = z
  .object({
    customerId: z.number({
      required_error: "Customer id is required",
      invalid_type_error: "Customer id must be a number",
    }),
    date: z.date().optional(),
    status: z.string().refine((val) => OrderStatus.parse(val), {
      message: "Invalid order status",
    }),
    products: z
      .array(
        z.object({
          productId: z.number({
            required_error: "Product id is required",
            invalid_type_error: "Product id must be a number",
          }),
          quantity: z.number({
            required_error: "Quantity is required",
            invalid_type_error: "Quantity must be a number",
          }),
        })
      )
      .nonempty(),
  })
  .strict();

export const OrderId = z.object({
  orderId: z
    .string({
      required_error: "Order id is required",
      invalid_type_error: "Order id must be a string",
    })
    .uuid(),
});

export const Order = OrderId.merge(BaseOrder);
export const UpdateOrder = BaseOrder.pick({ status: true });

export type IBasicOrder = z.infer<typeof BaseOrder>;
export type IOrder = Pick<IBasicOrder, "status">;
