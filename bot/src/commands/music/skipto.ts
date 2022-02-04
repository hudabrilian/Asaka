import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { player } from "../..";

export default class SkipToCommand extends BaseCommand {
  constructor() {
    super("skipto", "music", "music", ["st"]);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) {
      message.channel.send(`Please enter a valid number ${message.author}...`);
      return;
    }

    const queue = player.getQueue(message!.guild!.id);

    if (!queue || !queue.playing) {
      message.channel.send(`No music currently playing ${message.author}...`);
      return;
    }

    const reqNumber = Number(args[0]) - 1;

    const loadingMessage = await message.channel.send(
      `Skipping to track number ${reqNumber + 1}... 🎧`
    );

    try {
      queue.skipTo(Number(reqNumber));
    } catch {
      message.channel.send(
        `No music available for ${reqNumber + 1} in the queue.`
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    loadingMessage.delete();
  }
}
