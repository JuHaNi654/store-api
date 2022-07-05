import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const main = async () => {
  await prisma.customer.createMany({
    data: [
      {
        firstname: "John",
        lastname: "Doe",
        phone: "987654321",
        email: "john@lorem.com",
        street_address: "Street 1",
        city: "City",
        postcode: "12345",
      },
      {
        firstname: "Jane",
        lastname: "Doe",
        phone: "123456789",
        email: "jane@lorem.com",
        street_address: "Street 2",
        city: "City",
        postcode: "12345",
      },
    ],
  });

  await prisma.product.createMany({
    data: [
      {
        name: "Pizza",
        description: "Tasty salami pizza",
        price: 12.95,
        stock: 30,
      },
      {
        name: "Water",
        description: "Water bottle",
        price: 3.0,
        stock: 30,
      },
      {
        name: "Ice cream",
        description: "Vanilla ice cream",
        price: 3.0,
        stock: 30,
      },
    ],
  });
};

main()
  .catch((err) => console.error(err))
  .finally(() => {
    prisma.$disconnect();
  });
