import { Prisma } from "@prisma/client";

export type PrismaError = {
  statusCode: number;
  message: string;
};

export const handlePrismaErrors = (
  err: Prisma.PrismaClientKnownRequestError
): PrismaError => {
  switch (err.code) {
    case "P2003":
      return {
        statusCode: 404,
        message: "One of the products not found"
      }
    case "P2025":
      return {
        statusCode: 404,
        message: "Not found",
      };
    default:
      return {
        statusCode: 500,
        message: "Something went wrong",
      };
  }
};
