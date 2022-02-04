import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import CurseWords from "../../database/schemas/CurseWords";

export default class AddcursewordCommand extends BaseCommand {
  constructor() {
    super("addcurseword", "moderation", "anti-curse", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args.length) {
      message.channel.send("Please provide a word");
      return;
    }

    const words = args;
    const fixWords = words.filter((word: string) => word.trim());

    try {
      const updatedConfig = await CurseWords.findOneAndUpdate(
        {
          guildId: message.guildId,
        },
        {
          $push: {
            words: fixWords,
          },
        },
        {
          new: true,
        }
      );
      client.configs.set(message.guildId!, updatedConfig);
      message.channel.send(`Added words to curse words list successfully!`);
    } catch (err) {
      console.error(err);
      message.channel.send("Something went wrong.");
    }
  }
}
