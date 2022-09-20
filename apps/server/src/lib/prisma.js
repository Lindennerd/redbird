import { PrismaClient } from "@prisma/client";

// declare global {
//     // allow global `var` declarations
//   // eslint-disable-next-line no-var
//   var prisma = PrismaClient | undef
// }

export default {
  prisma: new PrismaClient({
    log: ["query", "error", "info", "warn"],
  }),
};
