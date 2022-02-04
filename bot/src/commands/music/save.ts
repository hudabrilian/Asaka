import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { player } from "../..";

export default class SaveCommand extends BaseCommand {
  constructor() {
    super("save", "music", "music", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue || !queue.playing) {
      message.channel.send(`No music currently playing ${message.author}...`);
      return;
    }

    await message.author
      .send(
        `You saved the track ${queue.current.title} | ${
          queue.current.author
        } from the server ${message!.guild!.name} ✅`
      )
      .catch((error) => {
        message.channel.send(
          `Unable to send you a private message ${message.author}...`
        );
        return;
      });

    message.channel.send(
      `I have sent you the title of the music by private messages ✅`
    );
    return;
  }
}
