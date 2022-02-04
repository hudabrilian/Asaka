import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { player } from "../..";

export default class StopCommand extends BaseCommand {
  constructor() {
    super("stop", "music", "music", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue) {
      message.channel.send(`No music currently playing ${message.author}...`);
      return;
    }

    queue.destroy();

    message.channel.send(
      `Music stopped into this server, see you next time ✅`
    );
  }
}
