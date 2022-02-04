import { QueueRepeatMode } from "discord-player";
import { Message } from "discord.js";
import { player } from "../../";
import DiscordClient from "../../client/client";
import BaseCommand from "../../utils/structures/BaseCommand";

export default class LoopCommand extends BaseCommand {
  constructor() {
    super("loop", "music", "music", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const queue = player.getQueue(message!.guild!.id);
    const config = client.configs.get(message.guildId!);

    if (!queue || !queue.playing) {
      message.channel.send(`No music currently playing ${message.author}...`);
      return;
    }

    if (args.join("").toLowerCase() === "queue") {
      if (queue.repeatMode === 1) {
        message.channel.send(
          `You must first disable the current music in the loop mode (${
            config!.prefix
          }loop) ${message!.author}...`
        );
        return;
      }

      const success = queue.setRepeatMode(
        queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF
      );

      if (success) {
        message.channel.send(
          `Repeat mode **${
            queue.repeatMode === 0 ? "disabled" : "enabled"
          }** the whole queue will be repeated endlessly 🔁`
        );
        return;
      } else {
        message.channel.send(`Something went wrong ${message.author}...`);
        return;
      }
    } else {
      if (queue.repeatMode === 2) {
        message.channel.send(
          `You must first disable the current queue in the loop mode (${
            config!.prefix
          }loop queue) ${message!.author}...`
        );
        return;
      }

      const success = queue.setRepeatMode(
        queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF
      );

      if (success) {
        message.channel.send(
          `Repeat mode **${
            queue.repeatMode === 0 ? "disabled" : "enabled"
          }** the current music will be repeated endlessly (you can loop the queue with the <queue> option) 🔂`
        );
      } else {
        message.channel.send(`Something went wrong ${message.author}...`);
        return;
      }
    }
  }
}
