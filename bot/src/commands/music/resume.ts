import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { player } from "../..";

export default class ResumeCommand extends BaseCommand {
  constructor() {
    super("resume", "music", "music", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue) {
      message.channel.send(`No music currently playing ${message.author}...`);
      return;
    }

    const success = queue.setPaused(false);

    if (success) {
      message.channel.send(`Current music ${queue.current.title} resumed ✅`);
    } else {
      message.channel.send(`Something went wrong ${message.author}...`);
    }
  }
}
