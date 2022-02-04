import mongoose from "mongoose";

const OAuth2CredentialsSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  discordId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("OAuth2Credentials", OAuth2CredentialsSchema);
