const Contract = require("../models/contractSchema");

const findContract = async (contractName) => {
  const contract = await Contract.findOne({ name: contractName });
  if (!contract) {
    return { message: `Contract ${contractName} not found` };
  }
  return contract._id;
};

module.exports = findContract;
