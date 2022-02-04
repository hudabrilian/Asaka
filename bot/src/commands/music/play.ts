import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import { player } from "../../";
import { QueryType } from "discord-player";

export default class PlayCommand extends BaseCommand {
  constructor() {
    super("play", "music", "music", ["p"]);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    if (!args[0]) {
      message.channel.send(`Please enter a valid search ${message.author}...`);
      return;
    }

    const res = await player.search(args.join(" "), {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO,
    });

    if (!res || !res.tracks.length) {
      message.channel.send(`No results found ${message.author}...`);
      return;
    }

    const queue = player.createQueue(message!.guild!, {
      metadata: message.channel,
    });

    try {
      if (!queue.connection)
        await queue.connect(message!.member!.voice!.channel!);
    } catch {
      player.deleteQueue(message!.guild!);
      message.channel.send(
        `I can't join the voice channel ${message.author}...`
      );
      return;
    }

    const loadingMessage = await message.channel.send(
      `Loading your ${res.playlist ? "playlist" : "track"}... 🎧`
    );

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
    if (!queue.playing) await queue.play();

    await new Promise((resolve) => setTimeout(resolve, 2000));
    loadingMessage.delete();
  }
}
