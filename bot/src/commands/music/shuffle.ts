import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { player } from "../..";

export default class ShuffleCommand extends BaseCommand {
  constructor() {
    super("shuffle", "music", "music", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue || !queue.playing) {
      message.channel.send(`No music currently playing ${message.author}...`);
      return;
    }

    if (!queue.tracks[0]) {
      message.channel.send(
        `No music in the queue after the current one ${message.author}...`
      );
      return;
    }

    queue.shuffle();

    message.channel.send(
      `Queue shuffled **${queue.tracks.length}** song(s) ! ✅`
    );
    return;
  }
}
