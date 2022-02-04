import axios from "axios";
import CryptoJS from "crypto-js";
import OAuth2Credentials from "../database/schemas/OAuth2Credentials";
import { decrypt } from "./utils";

const TOKEN = process.env.DASHBOARD_BOT_TOKEN;

const DISCORD_API = "http://discord.com/api/v9";

const getBotGuilds = async (): Promise<Object> => {
  return axios
    .get(`${DISCORD_API}/users/@me/guilds`, {
      method: "GET",
      headers: {
        Authorization: `Bot ${TOKEN}`,
      },
    })
    .then(({ data }) => {
      return data;
    });
};

const getGuild = async (guildId: string): Promise<Object> => {
  return axios
    .get(`${DISCORD_API}/guilds/${guildId}`, {
      method: "GET",
      headers: {
        Authorization: `Bot ${TOKEN}`,
      },
    })
    .then(({ data }) => {
      return data;
    });
};

const getUserGuilds = async (discordId: string): Promise<Object> => {
  const credentials = await OAuth2Credentials.findOne({ discordId });
  if (!credentials) throw new Error("No credentials");
  const encryptedAccessToken = credentials.get("accessToken");
  const decrypted = decrypt(encryptedAccessToken);
  const accessToken = decrypted.toString(CryptoJS.enc.Utf8);

  return axios
    .get(`${DISCORD_API}/users/@me/guilds`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(({ data }) => {
      return data;
    });
};

async function getGuildRoles(guildId: string) {
  await axios
    .get(`${DISCORD_API}/guilds/${guildId}/roles`, {
      method: "GET",
      headers: {
        Authorization: `Bot ${TOKEN}`,
      },
    })
    .then((response) => {
      return response.data;
    });
}

const getGuildChannels = async (guildId: string): Promise<Object> => {
  return await axios
    .get(`${DISCORD_API}/guilds/${guildId}/channels`, {
      method: "GET",
      headers: {
        Authorization: `Bot ${TOKEN}`,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export {
  getBotGuilds,
  getGuildRoles,
  getUserGuilds,
  getGuild,
  getGuildChannels,
};
