import express from "express";
import Welcome from "../database/schemas/Welcome";
import User from "../database/schemas/User";
import {
  getBotGuilds,
  getGuild,
  getGuildChannels,
  getUserGuilds,
} from "../utils/api";
import { getMutualGuilds } from "../utils/utils";
import GuildConfiguration from "../database/schemas/GuildConfiguration";
import WelcomeGreeting from "../database/schemas/Welcome";
import { io } from "../";
import CurseWords from "../database/schemas/CurseWords";
const router = express.Router();

router.get("/guilds", async (req, res) => {
  const botGuilds = await getBotGuilds();
  const user = await User.findOne({
    discordId: req!.user!.discordId!,
  });
  if (user) {
    const userGuilds = await getUserGuilds(req.user!.discordId);
    const mutualGuilds = getMutualGuilds({
      userGuilds,
      botGuilds,
    });
    return res.send(mutualGuilds);
  } else {
    return res.status(401).send({ msg: "Unauthorized" });
  }
});

router.get("/guild/:guildId", async (req, res) => {
  const { guildId } = req.params;
  const guild = await getGuild(guildId);
  return res.send(guild);
});

router.get("/guild/:guildId/channels", async (req, res) => {
  const { guildId } = req.params;
  const channels = await getGuildChannels(guildId);
  return res.send(channels);
});

//? Plugins
// Status
router.get("/guild/:guildId/status", async (req, res) => {
  const { guildId } = req.params;
  const data = await GuildConfiguration.findOne({ guildId }, [
    "disabled_plugins",
    "disabled_commands",
  ]);
  return data ? res.send(data) : res.status(404).send({ msg: "Not found" });
});

router.put("/guild/:guildId/status/:type", async (req, res) => {
  const { payload } = req.body;
  const { guildId, type } = req.params;
  if (!payload)
    return res.status(400).send({ msg: "Plugin or Command Required" });
  if (!type) return res.status(400).send({ msg: "Type Required" });

  let update;
  if (type === "plugin") {
    const guildConfigs = await GuildConfiguration.findOneAndUpdate(
      {
        guildId,
        disabled_plugins: payload,
      },
      {
        $pull: {
          disabled_plugins: {
            $in: payload,
          },
        },
      }
    );
    if (guildConfigs) {
      update = guildConfigs;
    } else {
      update = await GuildConfiguration.findOneAndUpdate(
        { guildId },
        {
          $push: {
            disabled_plugins: [payload],
          },
        },
        { new: true }
      );
    }
  } else if (type === "command") {
    const guildConfigs = await GuildConfiguration.findOneAndUpdate(
      {
        guildId,
        disabled_commands: payload,
      },
      {
        $pull: {
          disabled_commands: {
            $in: payload,
          },
        },
      }
    );
    if (guildConfigs) {
      update = guildConfigs;
    } else {
      update = await GuildConfiguration.findOneAndUpdate(
        { guildId },
        {
          $push: {
            disabled_commands: [payload],
          },
        },
        { new: true }
      );
    }
  } else {
    return res.status(400).send({ msg: "Invalid Type" });
  }

  if (update) {
    res.send(update);
  } else {
    res.status(400).send({ msg: "Could not find document" });
  }
});

// Prefix
router.get("/guild/:guildId/prefix", async (req, res) => {
  const { guildId } = req.params;
  const prefix = await GuildConfiguration.findOne({ guildId });
  return prefix ? res.send(prefix) : res.status(404).send({ msg: "Not found" });
});

router.put("/guild/:guildId/prefix", async (req, res) => {
  const { prefix } = req.body;
  const { guildId } = req.params;
  if (!prefix) return res.status(400).send({ msg: "Prefix Required" });
  const update = await GuildConfiguration.findOneAndUpdate(
    { guildId },
    { prefix },
    { new: true }
  );
  if (update) {
    io.emit("guildPrefixUpdate", update);
    res.send(update);
  } else {
    res.status(400).send({ msg: "Could not find document" });
  }
});

// Welcome
router.get("/guild/:guildId/welcome", async (req, res) => {
  const { guildId } = req.params;
  const welcome = await WelcomeGreeting.findOne({ _id: guildId });
  return welcome
    ? res.send(welcome)
    : res.status(404).send({ msg: "Not found" });
});

router.put("/guild/:guildId/welcome", async (req, res) => {
  const { channel, message } = req.body;
  const { guildId } = req.params;
  if (!channel) return res.status(400).send({ msg: "Channel Required" });
  if (!message) return res.status(400).send({ msg: "Message Required" });
  const update = await WelcomeGreeting.findOneAndUpdate(
    { _id: guildId },
    { channelId: channel, text: message },
    { new: true, upsert: true }
  );
  return update
    ? res.send(update)
    : res.status(400).send({ msg: "Could not find document" });
});

// Anti Curse
router.get("/guild/:guildId/anti-curse", async (req, res) => {
  const { guildId } = req.params;
  const curseWords = await CurseWords.findOne({ guildId });
  return curseWords
    ? res.send(curseWords)
    : res.status(404).send({ msg: "Not found" });
});

router.put("/guild/:guildId/anti-curse", async (req, res) => {
  const words = req.body.words.split(",");
  const fixWords = words.filter((word: string) => word.trim());
  const { guildId } = req.params;
  if (!fixWords) return res.status(400).send({ msg: "Curse words Required" });
  const update = await CurseWords.findOneAndUpdate(
    { guildId },
    { words: fixWords },
    { new: true, upsert: true }
  );
  return update
    ? res.send(update)
    : res.status(400).send({ msg: "Could not find document" });
});

export default router;
