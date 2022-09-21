const bcrypt = require("bcrypt");

module.exports = {
  async getHash(data) {
    return await bcrypt.hash(data, 10);
  },

  async compare(data, encrypted) {
    return await bcrypt.compare(data, encrypted);
  },
};
