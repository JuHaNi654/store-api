import { prisma } from "../../config/prisma";
import { IBaseCustomer } from "./customer";

export default {
  create: async (customer: IBaseCustomer) => {
    return await prisma.customer.create({
      data: customer,
    });
  },

  update: async (id: number, customer: Partial<IBaseCustomer>) => {
    return await prisma.customer.update({
      where: {
        customerId: id,
      },
      data: customer,
    });
  },

  findAll: async () => {
    return await prisma.customer.findMany({});
  },

  findById: async (id: number) => {
    return await prisma.customer.findFirst({
      where: {
        customerId: id,
      },
    });
  },

  delete: async (id: number) => {
    return await prisma.customer.delete({
      where: {
        customerId: id,
      },
    });
  },
};
