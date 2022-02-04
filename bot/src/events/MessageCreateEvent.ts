// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageCreate
import { Message } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";
import CurseWords from "../database/schemas/CurseWords";
import GuildConfiguration from "../database/schemas/GuildConfiguration";
import Levels from "discord-xp";

export default class CreateMessageEvent extends BaseEvent {
  constructor() {
    super("messageCreate");
  }

  async run(client: DiscordClient, message: Message) {
    if (message.author.bot) return;
    const config = client.configs.get(message.guildId!);
    if (!config) {
      message.channel.send("No configuration set.");
      return;
    }

    const { disabled_plugins, disabled_commands } =
      await GuildConfiguration.findOne({
        guildId: message.guildId,
      });

    //? Anti Curse Plugin
    if (!disabled_plugins.includes("anti-curse")) {
      const curseWordsData = await CurseWords.findOne({
        guildId: message.guildId,
      });

      if (curseWordsData) {
        const curseWords = curseWordsData!.words;
        for (let i in curseWords) {
          if (
            message.content.toLowerCase().includes(curseWords[i].toLowerCase())
          ) {
            message.channel.send(`Why you writing that? ${message.author}`);
            message.delete();
          }
        }
      }
    }

    //? Level Plugin
    if (
      !disabled_plugins.includes("level") &&
      !message.content.startsWith(config.prefix)
    ) {
      const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
      const hasLeveledUp = await Levels.appendXp(
        message.author.id,
        message.guildId!,
        randomAmountOfXp
      );
      if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guildId!);
        message.channel.send({
          content: `${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`,
        });
      }
    }

    if (message.content.startsWith(config.prefix)) {
      const [cmdName, ...cmdArgs] = message.content
        .slice(config.prefix.length)
        .trim()
        .split(/\s+/);
      const command = client.commands.get(cmdName);

      if (
        disabled_commands.includes(command?.getName()) ||
        disabled_plugins.includes(command?.getPlugin())
      ) {
        message.channel.send(
          `This Plugin or Command has been disabled for this guild`
        );
        return;
      }

      if (command) {
        command.run(client, message, cmdArgs);
      }
    }
  }
}
