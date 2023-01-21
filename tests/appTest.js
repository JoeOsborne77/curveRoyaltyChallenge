const chai = require("chai");
const expect = chai.expect;
const App = require("../App");
const mongoose = require("mongoose");
const Track = require("../models/trackSchema");
const Contract = require("../models/contractSchema");

describe("App", () => {
  before(async () => {
    await mongoose.connect("mongodb://0.0.0.0/curveroyaltytest", {
      useNewUrlParser: true,
    });
  });

  after(async () => {
    await Track.deleteMany({});
    await Contract.deleteMany({});
  });

  it("should save track with contract association", async () => {
    const contract = new Contract({ name: "Test Contract" });
    await contract.save();
    const track = new Track({
      title: "Test Track",
      contract_id: contract._id,
      ISRC: "ISRC1",
      version: "Version 1",
      artist: "Artist 1",
      P_line: "P Line 1",
      aliases: "aliases1;aliases2",
    });
    await track.save();
    await App();
    const savedTrack = await Track.findOne({ title: "Test Track" });
    expect(savedTrack.contract_id.toString()).to.equal(contract._id.toString());
  });

  it("should return error if contract not found", async () => {
    const track = new Track({
      title: "Test Track 2",
      contract_id: "5f5d9fb946aeba3c865d5a5f",
      ISRC: "ISRC2",
    });
    await track.save();
    let errors = await App();
    expect(errors[0])
      .to.have.property("message")
      .that.equals("Contract Contract 1 not found");
    expect(errors[0]).to.have.property("line").that.equals(0);
  });

  it("should save track without contract association", async () => {
    const track = new Track({
      title: "Test Track 3",
      ISRC: "ISRC2",
      contract_id: null,
    });
    await track.save();
    await App();
    const savedTrack = await Track.findOne({ title: "Test Track 3" });
    expect(savedTrack.contract_id).to.be.null;
  });

  it("should save track with only required fields association", async () => {
    const contract = new Contract({ name: "Test Contract" });
    await contract.save();
    const track = new Track({
      title: "Test Track 4",
      ISRC: "ISRC3",
    });
    await track.save();
    await App();
    const savedTrack = await Track.findOne({ title: "Test Track 4" });
    expect(savedTrack.title.toString()).to.equal("Test Track 4");
  });
});
