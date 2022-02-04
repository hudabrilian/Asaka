import { Client, ClientOptions, Collection } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import BaseCommand from "../utils/structures/BaseCommand";
import BaseGuildConfiguration from "../utils/structures/BaseGuildConfiguration";

export default class DiscordClient extends Client {
  private _commands = new Collection<string, BaseCommand>();
  private _events = new Collection<string, BaseEvent>();
  private _configs = new Collection<string, BaseGuildConfiguration>();

  constructor(options: ClientOptions) {
    super(options);
  }

  get commands(): Collection<string, BaseCommand> {
    return this._commands;
  }
  get events(): Collection<string, BaseEvent> {
    return this._events;
  }
  get configs(): Collection<string, BaseGuildConfiguration> {
    return this._configs;
  }
  set configs(guildConfigs: Collection<string, BaseGuildConfiguration>) {
    this._configs = guildConfigs;
  }
}
