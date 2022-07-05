import { z } from "zod";

export const BaseCustomer = z
  .object({
    firstname: z.string({
      required_error: "Firstname is required",
      invalid_type_error: "Firstname must be a string",
    }),
    lastname: z.string({
      required_error: "Lastname is required",
      invalid_type_error: "Lastname must be a string",
    }),
    phone: z.string({
      required_error: "Phone is required",
      invalid_type_error: "Phone must be a string",
    }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email(),
    street_address: z.string({
      required_error: "Street address is required",
      invalid_type_error: "Street address must be a string",
    }),
    city: z.string({
      required_error: "City is required",
      invalid_type_error: "City must be a string",
    }),
    postcode: z.string({
      required_error: "Postcode is required",
      invalid_type_error: "Postcode must be a string",
    }),
  })
  .strict();

export const CustomerId = z.object({
  customerId: z.number({
    required_error: "Customer id is required",
    invalid_type_error: "Customer id must be a number",
  }),
});

export const Customer = CustomerId.merge(BaseCustomer);
export type ICustomer = z.infer<typeof Customer>;
export type IBaseCustomer = z.infer<typeof BaseCustomer>;
