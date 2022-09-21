const db = require("../lib/prisma");
const genHash = require("../lib/crypt");

module.exports = {
  getUsers: async (parent, args, request) => {
    if (!request.user) return null;
    return await db.prisma.user.findMany();
  },

  registerUser: async (parent, args) => {
    const user = args;
    if (user.password !== user.passwordConfirmation)
      throw "Passwords dont match";

    const hashedPassword = await genHash(user.password);

    return await db.prisma.user.create({
      data: {
        name: user.name,
        password: hashedPassword,
        email: user.email,
        profile: {
          connectOrCreate: {
            create: {
              displayName: user.name,
            },
            where: {
              id: "0",
            },
          },
        },
      },
    });
  },
};
