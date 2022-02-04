export default class BaseGuildConfiguration {
  private _guildId!: string;
  private _prefix!: string;

  get guildId(): string {
    return this._guildId;
  }

  get prefix(): string {
    return this._prefix;
  }

  set guildId(guildId: string) {
    this._guildId = guildId;
  }

  set prefix(prefix: string) {
    this._prefix = prefix;
  }
}
