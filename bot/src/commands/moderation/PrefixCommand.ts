import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import GuildConfiguration from "../../database/schemas/GuildConfiguration";

export default class PrefixCommand extends BaseCommand {
  constructor() {
    super("prefix", "moderation", "prefix", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args.length) {
      message.channel.send("Please provide an argument");
      return;
    }

    const [newPrefix] = args;

    try {
      const updatedConfig = await GuildConfiguration.findOneAndUpdate(
        {
          guildId: message.guildId,
        },
        {
          prefix: newPrefix,
        },
        {
          new: true,
        }
      );
      client.configs.set(message.guildId!, updatedConfig);
      message.channel.send(`Updated prefix successfully!`);
    } catch (err) {
      console.error(err);
      message.channel.send("Something went wrong.");
    }
  }
}
