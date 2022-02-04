import { toHTML } from "discord-markdown";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { PluginSkeleton } from "../../components/PluginSkeleton";
import {
  getGuildChannels,
  getWelcomeGuild,
  updateWelcomeGuild,
} from "../../utils/api";
const { Parser } = require("html-to-react");

type Channel = {
  id: string;
  name: string;
};

export const PluginWelcome = () => {
  const [channel, setChannel] = useState("");
  const [message, setMessage] = useState("Welcome {user} to my server!");

  const [defChannel, setDefChannel] = useState("");
  const [defMessage, setDefMessage] = useState("Welcome {user} to my server!");

  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const params = useParams();

  useEffect(() => {
    const getData = async () => {
      await getWelcomeGuild(params!.id!)
        .then(({ data }) => {
          setMessage(data.text);
          setChannel(data.channelId);
          setDefMessage(data.text);
          setDefChannel(data.channelId);
        })
        .catch((err) => {});

      await getGuildChannels(params!.id!).then(({ data }) => {
        const filtered = data.filter((channel: any) => {
          return channel.type === 0;
        });
        setChannels(filtered);
      });
    };

    getData().then(() => {
      setLoading(false);
    });
  }, []);

  const handleChange = (e: { target: { value: string } }) => {
    setChannel(e.target.value);
    setIsEdit(e.target.value !== defChannel || message !== defMessage);
  };

  return (
    <div>
      {!loading ? (
        <div className="flex flex-col space-y-10">
          <div className="flex flex-col space-y-5">
            <label className="font-semibold text-lg leading-none text-white">
              Welcome Channel
            </label>
            <select
              className="text-white p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-stone-600 rounded"
              onChange={handleChange}
              value={channel}
            >
              {channels.map((value: Channel) => (
                <option value={value.id} key={value.id}>
                  #{value.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-5 w-full">
            <label className="font-semibold text-lg leading-none text-white">
              Message
            </label>
            <div className="flex-col space-y-5 w-full">
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setIsEdit(
                    e.target.value !== defMessage || channel !== defChannel
                  );
                }}
                className="w-full h-40 text-base leading-none text-white p-3 focus:outline-none focus:border-blue bg-stone-600 border-0 rounded"
              ></textarea>
              <OutputExample text={message} />
            </div>
          </div>
          {isEdit && (
            <ConfirmationModal
              save={() => {
                updateWelcomeGuild(params!.id!, channel, message).then(() => {
                  setIsEdit(false);
                  setDefChannel(channel);
                  setDefMessage(message);
                  toast(`Successfully saved!`);
                });
              }}
              cancel={() => {
                setIsEdit(false);
                setChannel(defChannel);
                setMessage(defMessage);
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

const OutputExample = (props: any) => {
  const outputText = props.text.replace(/{user}/g, ` <@1234567890> `);
  return (
    <div className="bg-stone-900 px-4 py-2 rounded-xl">
      {Parser().parse(
        toHTML(outputText, {
          discordCallback: {
            user: (node) => `@TestUser`,
          },
        })
      )}
    </div>
  );
};
