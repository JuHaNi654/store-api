import { prisma } from "../../config/prisma";
import { IBasicOrder, IOrder, OrderStatus } from "./order";

export default {
  create: async (order: IBasicOrder) => {
    return await prisma.order.create({
      data: {
        customerId: order.customerId,
        products: {
          create: order.products,
        },
      },
    });
  },

  findAll: async () => {
    return await prisma.order.findMany({});
  },

  findById: async (id: string) => {
    return await prisma.order.findFirst({
      where: {
        orderId: id,
      },
      select: {
        orderId: true,
        customerId: true,
        date: true,
        status: true,
        products: {
          select: {
            quantity: true,
            product: {
              select: {
                productId: true,
                name: true,
                description: true,
                price: true,
              },
            },
          },
        },
      },
    });
  },

  update: async (orderId: string, order: Required<IOrder>) => {
    return await prisma.order.update({
      where: { orderId },
      data: {
        status: order.status as OrderStatus,
      },
    });
  },

  delete: async (id: string) => {
    return await prisma.order.delete({
      where: {
        orderId: id,
      },
    });
  },

  getOrderItems: async (orderId: string) => {
    return await prisma.orderList.findMany({
      where: {
        orderId,
      },
      select: {
        orderId: true,
        productId: true,
        quantity: true,
        product: {
          select: {
            stock: true,
          },
        },
      },
    });
  },
};
