const bcrypt = require("bcrypt");

async function EncodeData(data) {
  const salt = await bcrypt.genSalt(10);
  const encodedData = await bcrypt.hash(data, salt);
  return encodedData;
}

module.exports = EncodeData;
