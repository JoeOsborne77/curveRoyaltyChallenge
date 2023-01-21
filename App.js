const xlsx = require("xlsx");
const trackData = xlsx.readFile(
  "/Users/joeosborne/Documents/curveRoyaltyTechTest/data/testTrackData.xlsx"
);
const sheet = trackData.Sheets[trackData.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet);
const connectToDb = require("./utilities/connectToDb");
const findContract = require("./utilities/findContract");
const createTrack = require("./utilities/createTrack");

const App = async () => {
  connectToDb();
  const errors = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const contractName = row.Contract;
    if (contractName) {
      const contractId = await findContract(contractName);
      if (contractId.message) {
        errors.push({ line: i, message: contractId.message });
        continue;
      }
      const trackError = await createTrack(row, contractId);
      if (trackError) {
        errors.push({ line: i, message: trackError.message });
      }
    }
  }
  if (errors.length > 0) {
    return errors;
  }
};

module.exports = App;
