import blacklistSchema from "../models/blacklist.js";

export default async function isTokenBlacklisted(token) {
  const isTokenBlacklisted = await blacklistSchema.find({ token });

  if (isTokenBlacklisted.length > 0) {
    return true;
  }

  return false;
}
