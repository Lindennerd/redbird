import db from "../lib/prisma.js";

export default {
  getUsers: () => {
    return db.prisma.user.findMany();
  },
};
