// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
import { GuildMember, TextChannel } from "discord.js";
import BaseEvent from "../utils/structures/BaseEvent";
import DiscordClient from "../client/client";
import WelcomeGreeting from "../database/schemas/WelcomeGreeting";
import GuildConfiguration from "../database/schemas/GuildConfiguration";

export default class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super("guildMemberAdd");
  }

  async run(client: DiscordClient, member: GuildMember) {
    const { disabled_plugins } = await GuildConfiguration.findOne({
      guildId: member.guild.id,
    });

    if (disabled_plugins.includes("welcome")) return;

    const config = await WelcomeGreeting.findOne({ _id: member.guild.id });
    if (!config) return;

    const { channelId, text } = config;
    const channel = member.guild.channels.cache.get(channelId) as TextChannel;
    const updatedText = text.replace(/{user}/g, `<@${member.id}>`);
    channel.send({ content: updatedText });
  }
}
