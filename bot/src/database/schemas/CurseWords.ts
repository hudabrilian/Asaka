import mongoose, { Schema } from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const curseWordsSchema = new Schema({
  _id: reqString,
  guildId: reqString,
  words: { type: Array, required: true },
});

const name = "curse_words";
export default mongoose.models[name] ||
  mongoose.model(name, curseWordsSchema, name);
