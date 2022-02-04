import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { PluginSkeleton } from "../../components/PluginSkeleton";
import { getPrefixGuild, updatePrefixGuild } from "../../utils/api";

export const PluginPrefix = () => {
  const [prefix, setPrefix] = useState("");
  const [defPrefix, setDefPrefix] = useState(prefix);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const params = useParams();

  useEffect(() => {
    getPrefixGuild(params!.id!)
      .then(({ data }) => {
        setPrefix(data.prefix);
        setDefPrefix(data.prefix);
        setLoading(false);
      })
      .catch(() => {
        setPrefix("!");
        setDefPrefix("!");
        setLoading(false);
      });
  }, [params]);

  return (
    <div>
      {!loading ? (
        <div className="flex flex-col space-y-10">
          <div className="flex flex-col space-y-5">
            <label className="font-semibold text-lg leading-none text-white">
              Prefix
            </label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => {
                setPrefix(e.target.value);
                setIsEdit(e.target.value !== defPrefix);
              }}
              className="leading-none text-white p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-stone-600 rounded"
            />
            <div className="flex items-center space-x-3 text-sm text-gray-50">
              <CodeExample text={`${prefix}play`} />
              <CodeExample text={`${prefix}level @user`} />
            </div>
          </div>
          {isEdit && (
            <ConfirmationModal
              save={() => {
                updatePrefixGuild(params!.id!, prefix).then(() => {
                  setIsEdit(false);
                  setDefPrefix(prefix);
                  toast(`Successfully saved!`);
                });
              }}
              cancel={() => {
                setIsEdit(false);
                setPrefix(defPrefix);
              }}
            />
          )}
        </div>
      ) : (
        <PluginSkeleton />
      )}
    </div>
  );
};

const CodeExample = (props: any) => {
  return <div className="bg-stone-900 px-3 rounded-xl">{props.text}</div>;
};
