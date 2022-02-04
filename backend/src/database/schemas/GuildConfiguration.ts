import mongoose, { Schema } from "mongoose";

const reqString = {
  type: String,
  required: true,
};

const guildConfigurationSchema = new Schema({
  _id: reqString,
  guildId: reqString,
  prefix: reqString,
  disabled_plugins: {
    type: Array,
  },
  disabled_commands: {
    type: Array,
  },
});

const name = "guild_configurations";
export default mongoose.models[name] ||
  mongoose.model(name, guildConfigurationSchema, name);
