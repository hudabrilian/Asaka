import { PropsWithChildren, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CommandLink } from "../../components/CommandLink";
import { PluginSkeleton } from "../../components/PluginSkeleton";
import {
  getPrefixGuild,
  getStatusGuild,
  updateStatusGuild,
} from "../../utils/api";
import { PluginListData } from "../../utils/PluginListData";
import { Command } from "../../utils/structures/BaseCommand";

export interface Props {
  plugin: string;
  guild: string;
}

export const PluginCommandList = (props: PropsWithChildren<Props>) => {
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prefix, setPrefix] = useState("");
  const [commandsList, setCommandsList] = useState<Command[]>([]);

  useEffect(() => {
    const commandsList: Command[] = PluginListData.map((data) => {
      return data.plugins.filter((selPlugin) => {
        return selPlugin.link === props.plugin;
      });
    }).filter((data) => data.length)[0][0].commands;

    setCommandsList(commandsList);

    getStatusGuild(props.guild)
      .then(({ data }) => {
        setStatus(data.disabled_commands);
      })
      .catch((err) => {
        console.error(err);
      });

    getPrefixGuild(props.guild)
      .then(({ data }) => {
        setPrefix(data.prefix);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const toggleCommand = async (name: string) => {
    updateStatusGuild(props.guild, "command", name);
    setStatus([]);
    toast(`Updated ${name} command successfully!`);
  };

  return (
    <div>
      {!loading ? (
        <>
          <h1 className="font-semibold text-lg leading-none text-white">
            Commands
          </h1>
          <div className="grid gap-4 py-5">
            {commandsList.length > 0 ? (
              <>
                {commandsList.map((command, index) => {
                  return (
                    <CommandLink
                      command={command}
                      active={!status.includes(command.name as never)}
                      key={index}
                      onClick={() => toggleCommand(command.name)}
                      details={false}
                      prefix={`${prefix}`}
                    />
                  );
                })}
              </>
            ) : (
              <>No Commands Found.</>
            )}
          </div>
        </>
      ) : (
        <PluginSkeleton />
      )}
    </div>
  );
};
