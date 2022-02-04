import { Command } from "./structures/BaseCommand";

type Plugins = { name: string; link: string; commands: Array<Command> };

type PluginList = {
  name: string;
  plugins: Array<Plugins>;
};

export const PluginListData: Array<PluginList> = [
  {
    name: "Server Management",
    plugins: [
      {
        name: "Command Prefix",
        link: "prefix",
        commands: [
          {
            name: "prefix",
            aliases: [],
            usage: "<prefix>",
            description: "Change Asaka bot prefix on this guild.",
          },
        ],
      },
      {
        name: "Welcome Message",
        link: "welcome",
        commands: [
          {
            name: "setwelcome",
            aliases: [],
            usage: "<channel> <message>",
            description: "Change.",
          },
        ],
      },
      {
        name: "Anti Curse Words",
        link: "anti-curse",
        commands: [
          {
            name: "addcurseword",
            aliases: [],
            usage: "<word>",
            description: "Change.",
          },
        ],
      },
    ],
  },
  {
    name: "Engagement & Fun",
    plugins: [
      {
        name: "Levels",
        link: "level",
        commands: [
          {
            name: "level",
            aliases: [],
            usage: "[user]",
            description: "Change.",
          },
        ],
      },
      {
        name: "Music",
        link: "music",
        commands: [
          {
            name: "play",
            aliases: ["p", "pl"],
            usage: "<music>",
            description: "Play music.",
          },
          {
            name: "stop",
            aliases: [],
            usage: "",
            description: "Stop music.",
          },
          {
            name: "skip",
            aliases: [],
            usage: "",
            description: "Skip music.",
          },
          {
            name: "skipto",
            aliases: ["st"],
            usage: "<number>",
            description: "Skip to number music.",
          },
          {
            name: "loop",
            aliases: [],
            usage: "",
            description: "Loop current queue music.",
          },
          {
            name: "nowplaying",
            aliases: ["np"],
            usage: "",
            description: "Show current queue music playing.",
          },
          {
            name: "pause",
            aliases: [],
            usage: "",
            description: "Pause current music.",
          },
          {
            name: "queue",
            aliases: ["q"],
            usage: "",
            description: "Show current queue music playing.",
          },
          {
            name: "resume",
            aliases: [],
            usage: "",
            description: "Resume current music.",
          },
          {
            name: "save",
            aliases: [],
            usage: "",
            description: "Save current music playing.",
          },
          {
            name: "search",
            aliases: [],
            usage: "<music>",
            description: "Search music.",
          },
          {
            name: "shuffle",
            aliases: [],
            usage: "",
            description: "Shuffle current queue.",
          },
          {
            name: "volume",
            aliases: [],
            usage: "<number>",
            description: "Set volume to the specified value.",
          },
        ],
      },
    ],
  },
  {
    name: "Utilities",
    plugins: [
      {
        name: "Help",
        link: "help",
        commands: [],
      },
    ],
  },
];
