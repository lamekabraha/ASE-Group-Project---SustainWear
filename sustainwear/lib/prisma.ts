import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const prisma = new PrismaClient();

  // Fix lowercase enum values BEFORE Prisma returns them
  prisma.$extends({
    result: {
      donation: {
        status: {
          needs: { status: true },
          compute({ status }) {
            if (!status) return status;

            // Convert lowercase→UPPERCASE so Prisma stays happy
            return status.toUpperCase();
          },
        },
      },
    },
  });

  return prisma;
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();
globalThis.prisma = prisma;

export default prisma;
