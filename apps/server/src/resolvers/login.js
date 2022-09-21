const db = require("../lib/prisma");
const { compare } = require("../lib/crypt");
const jwt = require("../lib/jwt");

module.exports = {
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
