// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildCreate
import { Guild } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";
import GuildConfiguration from "../database/schemas/GuildConfiguration";

export default class GuildCreateEvent extends BaseEvent {
  constructor() {
    super("guildCreate");
  }

  async run(client: DiscordClient, guild: Guild) {
    const config = await GuildConfiguration.findOne({ guildId: guild.id });
    const defPrefix = process.env.DEF_PREFIX;
    if (config) {
      client.configs.set(guild.id, config);
    } else {
      try {
        const conf = await GuildConfiguration.findOneAndUpdate(
          { guildId: guild.id },
          {
            guildId: guild.id,
            prefix: defPrefix,
            $push: {
              disabled_plugins: ["welcome"],
            },
          },
          { new: true, upsert: true }
        );

        client.configs.set(guild.id, conf);
      } catch (err) {
        console.log(err);
      }
    }
  }
}
