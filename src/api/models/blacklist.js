import mongoose from "mongoose";

const BlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

const blacklistSchema = mongoose.model("blacklist", BlacklistSchema);

export default blacklistSchema;
