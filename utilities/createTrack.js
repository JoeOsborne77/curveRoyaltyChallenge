const Track = require("../models/trackSchema");

const createTrack = async (row, contractId) => {
  const track = new Track({
    title: row.Title,
    version: row.Version,
    artist: row.Artist,
    ISRC: row.ISRC,
    P_line: row.P_line,
    aliases: row.Aliases.split(";"),
    contract_id: contractId,
  });
  try {
    await track.save();
  } catch (err) {
    return { line: i, message: err.message };
  }
};

module.exports = createTrack;
