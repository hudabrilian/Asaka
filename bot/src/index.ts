require("dotenv").config();
import {
  registerCommands,
  registerEvents,
  registerSocketEvents,
} from "./utils/registry";
import mongoose = require("mongoose");
import DiscordClient from "./client/client";
import { Collection, Intents } from "discord.js";
import GuildConfiguration from "./database/schemas/GuildConfiguration";
import BaseGuildConfiguration from "./utils/structures/BaseGuildConfiguration";
import { io } from "socket.io-client";
import Levels from "discord-xp";
import { Player } from "discord-player";

const client = new DiscordClient({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

export const player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
    filter: "audioonly",
  },
});

(async () => {
  const socket = io("http://localhost:3001");
  Levels.setURL(
    process.env.MONGO_URL ||
      "mongodb+srv://Pervica:Pervica@cluster0.jtimk.mongodb.net/AsakaV3"
  );
  await mongoose
    .connect(
      process.env.MONGO_URL ||
        "mongodb+srv://Pervica:Pervica@cluster0.jtimk.mongodb.net/AsakaV3"
    )
    .then(() => {
      console.log("Connected to server");
    });

  const configRepo = await GuildConfiguration.find();
  const configs = new Collection<string, BaseGuildConfiguration>();
  configRepo.forEach((config) => {
    configs.set(config.guildId, config);
  });

  await registerSocketEvents(client, socket);

  client.configs = configs;
  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await client.login(process.env.DISCORD_TOKEN);
})();

import "./utils/player";
