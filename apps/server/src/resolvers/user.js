import db from "../lib/prisma.js";
import genHash from "../lib/crypt.js";

export default {
  getUsers: async () => {
    return await db.prisma.user.findMany();
  },

  registerUser: async (parent, args) => {
    const user = args;
    console.log(user);
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
