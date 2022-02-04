import { useParams } from "react-router";
import { PluginPrefix } from "../sections/plugins/PluginPrefix";
import { PluginWelcome } from "../sections/plugins/PluginWelcome";
import { PluginAntiCurse } from "../sections/plugins/PluginAntiCurse";
import { PluginCommandList } from "../sections/plugins/PluginCommandsList";

export const PluginPage = () => {
  const { id, plugin } = useParams();

  return (
    <>
      <div className="flex-col space-y-10">
        {(() => {
          switch (plugin) {
            case "prefix":
              return <PluginPrefix />;
            case "welcome":
              return <PluginWelcome />;
            case "anti-curse":
              return <PluginAntiCurse />;
            default:
              return <div>Plugin not found</div>;
          }
        })()}
        <PluginCommandList plugin={`${plugin}`} guild={`${id}`} />
      </div>
      {/* <ConfirmationModal /> */}
    </>
  );
};
