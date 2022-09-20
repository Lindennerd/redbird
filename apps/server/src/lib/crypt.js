import bcrypt from "bcrypt";

const genHash = async (data) => {
  return await bcrypt.hash(data, 10);
};

export const compare = async (data, encrypted) => {
  return await bcrypt.compare(data, encrypted);
};

export default genHash;
