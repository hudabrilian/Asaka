import { Message } from "discord.js";
import DiscordClient from "../../client/client";

export default abstract class BaseCommand {
  constructor(
    private name: string,
    private category: string,
    private plugin: string,
    private aliases: Array<string>
  ) {}

  getName(): string {
    return this.name;
  }
  getCategory(): string {
    return this.category;
  }
  getPlugin(): string {
    return this.plugin;
  }
  getAliases(): Array<string> {
    return this.aliases;
  }

  abstract run(
    client: DiscordClient,
    message: Message,
    args: Array<string> | null
  ): Promise<void>;
}
