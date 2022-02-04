import { Message, MessageAttachment } from "discord.js";
import BaseCommand from "../../utils/structures/BaseCommand";
import DiscordClient from "../../client/client";
import Levels from "discord-xp";
import canvacord from "canvacord";

export default class LevelCommand extends BaseCommand {
  constructor() {
    super("level", "information", "level", []);
  }

  async run(client: DiscordClient, message: Message, args: Array<string>) {
    const target = message.mentions.users.first() || message.author; // Grab the target.

    const user = await Levels.fetch(target.id, message!.guild!.id, true); // Selects the target from the database.

    if (!user) {
      message.channel.send(
        "Seems like this user has not earned any xp so far."
      );
      return;
    }

    const rank = new canvacord.Rank()
      .setAvatar(target.displayAvatarURL({ format: "png", size: 512 }))
      .setCurrentXP(user.xp)
      .setLevel(user.level) // Current Level of the user
      .setRank(0, "Rank", false)
      .setRequiredXP(Levels.xpFor(user.level + 1))
      .setProgressBar("#FFFFFF", "COLOR")
      .setUsername(target.username)
      .setDiscriminator(target.discriminator);

    // rank.build({ fontX: "Manrope", fontY: "Manrope" }).then((data) => {
    //   const attachment = new MessageAttachment(data, "RankCard.png");
    //   message.channel.send({
    //     files: [await ],
    //   });
    // });
    message.channel.send({
      files: [await rank.build({ fontX: "Manrope", fontY: "Manrope" })],
    });
  }
}
