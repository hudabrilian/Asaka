import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { player } from "../..";

export default class QueueCommand extends BaseCommand {
  constructor() {
    super("queue", "music", "music", ["q"]);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const queue = player.getQueue(message!.guild!.id);

    if (!queue) {
      message.channel.send(`No music currently playing ${message.author}...`);
    }

    if (!queue.tracks[0]) {
      message.channel.send(
        `No music in the queue after the current one ${message.author}...`
      );
      return;
    }

    const embed = new MessageEmbed();
    const methods = ["", "🔁", "🔂"];

    embed.setColor("AQUA");
    embed.setThumbnail(
      message!.guild!.iconURL({ format: "png", size: 2048, dynamic: true }) ||
        ""
    );
    embed.setAuthor({
      name: `Server queue - ${message!.guild!.name} ${
        methods[queue.repeatMode]
      }`,
      iconURL: client!.user!.displayAvatarURL({ size: 1024, dynamic: true }),
    });

    const tracks = queue.tracks.map(
      (track, i) =>
        `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${
          track.requestedBy.username
        })`
    );

    const songs = queue.tracks.length;
    const nextSongs =
      songs > 5
        ? `And **${songs - 5}** other song(s)...`
        : `In the playlist **${songs}** song(s)...`;

    embed.setDescription(
      `Current ${queue.current.title}\n\n${tracks
        .slice(0, 5)
        .join("\n")}\n\n${nextSongs}`
    );

    embed.setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
}
