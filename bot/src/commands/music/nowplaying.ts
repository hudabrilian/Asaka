import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { player } from "../../";

export default class NowPlayingCommand extends BaseCommand {
  constructor() {
    super("nowplaying", "music", "music", ["np"]);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue || !queue.playing) {
      message.channel.send(
        `No music currently playing ${message.author}... try again ? ❌`
      );
      return;
    }

    const track = queue.current;

    const progress = queue.createProgressBar();

    const embed = new MessageEmbed();

    embed.setThumbnail(track.thumbnail);
    embed.setAuthor({
      name: track.title,
      iconURL: client!.user!.displayAvatarURL({ size: 1024, dynamic: true }),
    });

    const methods = ["disabled", "track", "queue"];

    embed.setDescription(
      `${progress}\n\nVolume **${queue.volume}**%\nDuration **${
        track.duration
      }**\nLoop mode **${methods[queue.repeatMode]}**\nRequested by ${
        track.requestedBy
      }`
    );

    embed.setTimestamp();
    message.channel.send({ embeds: [embed] });
  }
}
