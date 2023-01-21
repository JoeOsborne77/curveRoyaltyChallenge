const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  version: { type: String },
  artist: { type: String },
  ISRC: { type: String, required: true },
  P_line: { type: String },
  aliases: [{ type: String }],
  contract_id: { type: mongoose.Schema.Types.ObjectId, ref: "Contract" },
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
