import bcrypt from "bcrypt";

const genHash = async (data) => {
  return await bcrypt.hash(data, 10);
};

export default genHash;
