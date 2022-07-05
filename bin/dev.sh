#!/bin/bash
echo "Migrate database"
npx prisma migrate dev

echo "Prisma generate"
npx prisma generate

echo "Seed database"
npm run seed:dev

echo "Start development mode"
npm run start:dev
