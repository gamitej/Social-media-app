const bcrypt = require("bcrypt");

// encode data
async function EncodeData(data) {
  const salt = await bcrypt.genSalt(10);
  const encodedData = await bcrypt.hash(data, salt);
  return encodedData;
}

// check encoded data & data
async function CompareEncodeData(data, encodedData) {
  const result = await bcrypt.compare(data, encodedData);
  return result;
}

module.exports = EncodeData;
module.exports = CompareEncodeData;
