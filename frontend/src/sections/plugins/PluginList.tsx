import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PluginLink } from "../../components/PluginLink";
import { getStatusGuild, updateStatusGuild } from "../../utils/api";
import { PluginListData } from "../../utils/PluginListData";

export const PluginList = ({ guild }: any) => {
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStatusGuild(guild)
      .then(({ data }) => {
        setStatus(data.disabled_plugins);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const togglePlugin = async (name: string) => {
    updateStatusGuild(guild, "plugin", name);
    setStatus([]);
    toast(`Updated ${name} plugin successfully!`);
  };

  return (
    <div className="flex-col space-y-5 divide-y divide-dashed divide-stone-600">
      {!loading ? (
        <>
          {PluginListData.map((category, index) => {
            return (
              <div className="flex-col space-y-10 py-5" key={index}>
                <div className="font-semibold text-lg">{category.name}</div>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.plugins.map((plugin, index) => {
                    return (
                      <PluginLink
                        name={plugin.name}
                        link={plugin.link}
                        active={!status.includes(plugin.link as never)}
                        key={index}
                        onClick={() => togglePlugin(plugin.link)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};
