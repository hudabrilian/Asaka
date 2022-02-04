import mongoose, { Schema } from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const welcomeGreetingSchema = new Schema({
  _id: reqString,
  channelId: reqString,
  text: reqString,
});

const name = "welcome_greeting";
export default mongoose.models[name] ||
  mongoose.model(name, welcomeGreetingSchema, name);
