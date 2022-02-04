import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { player } from "../..";

export default class VolumeCommand extends BaseCommand {
  constructor() {
    super("volume", "music", "music", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue) {
      message.channel.send(`No music currently playing ${message.author}...`);
      return;
    }

    const vol = parseInt(args[0]);

    if (!vol) {
      message.channel.send(
        `The current volume is ${
          queue.volume
        } 🔊\n*To change the volume enter a valid number between **1** and **${100}**.*`
      );
      return;
    }

    if (queue.volume === vol) {
      message.channel.send(
        `The volume you want to change is already the current one ${message.author}...`
      );
      return;
    }

    if (vol < 0 || vol > 100) {
      message.channel.send(
        `The specified number is not valid. Enter a number between **1** and **${100}** ${
          message.author
        }...`
      );
      return;
    }

    const success = queue.setVolume(vol);

    if (success) {
      message.channel.send(
        `The volume has been modified to **${vol}**/**${100}**% 🔊`
      );
    } else {
      message.channel.send(`Something went wrong ${message.author}...`);
    }
  }
}
