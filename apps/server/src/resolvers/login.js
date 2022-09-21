import db from "../lib/prisma.js";
import { compare } from "../lib/crypt.js";
import jwt from "../lib/jwt.js";

export default {
  login: async (parent, args, request) => {
    const login = args;
    const user = await db.prisma.user.findFirst({
      where: {
        OR: [{ name: login.user }, { email: login.user }],
      },
      select: {
        name: true,
        email: true,
        id: true,
        password: true,
      },
    });

    if (!user || !compare(login.password, user.password))
      throw "Invalid credentials";

    delete user.password;
    const token = jwt.genToken(user);

    return await db.prisma.session.create({
      data: {
        userId: user.id,
        token: token,
      },
    });
  },
};
