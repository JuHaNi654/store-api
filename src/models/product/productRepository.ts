import { prisma } from "../../config/prisma";
import { IBaseProduct } from "./product";
import { z } from "zod";

export default {
  create: async (product: IBaseProduct) => {
    return await prisma.product.create({
      data: product,
    });
  },

  update: async (id: number, product: Partial<IBaseProduct>) => {
    return prisma.product.update({
      where: {
        productId: id,
      },
      data: product,
    });
  },

  findAll: async () => {
    return await prisma.product.findMany({});
  },

  findById: async (id: number) => {
    return await prisma.product.findFirst({
      where: {
        productId: id,
      },
    });
  },

  delete: async (id: number) => {
    return prisma.product.delete({
      where: {
        productId: id,
      },
    });
  },
};
