import { Message } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";

export default class SimjoinCommand extends BaseCommand {
  constructor() {
    super("simjoin", "test", "test", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    client.emit("guildMemberAdd", message.member!);
    message.channel.send("simjoin command works");
  }
}
