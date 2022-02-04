import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import WelcomeGreeting from "../../database/schemas/WelcomeGreeting";

export default class SetwelcomeCommand extends BaseCommand {
  constructor() {
    super("setwelcome", "moderation", "welcome", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const target = message.mentions.channels.first();
    if (!target || target.type !== "GUILD_TEXT") {
      message.channel.send("Please tag a text channel.");
      return;
    }

    const [channel, ...rest] = args;
    const text = rest.join(" ");

    try {
      await WelcomeGreeting.findOneAndUpdate(
        { _id: message.guildId },
        {
          _id: message.guildId,
          text,
          channelId: target.id,
        },
        { new: true, upsert: true }
      );
      message.channel.send(`Updated welcome greeting successfully!`);
    } catch (err) {
      console.error(err);
      message.channel.send("Something went wrong.");
    }
  }
}
