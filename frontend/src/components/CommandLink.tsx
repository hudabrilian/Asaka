import React, { useState } from "react";
import { Command } from "../utils/structures/BaseCommand";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

export const CommandLink = ({
  command,
  active = false,
  onClick,
  details,
  prefix,
}: {
  command: Command;
  active: boolean;
  onClick: Function;
  details: boolean;
  prefix: string;
}) => {
  const [toggle, setToggle] = useState(active);
  const [detailsStatus, setDetailsStatus] = useState(details);

  const activeClass = "transform translate-x-6";

  return (
    <div className="px-5 py-3 flex-col space-y-3 rounded-xl h-full bg-stone-700 divide-y divide-stone-800">
      <div
        className={
          " flex justify-between " +
          (toggle ? "cursor-pointer" : "cursor-not-allowed")
        }
        onClick={() => {
          if (!toggle) return;
          setDetailsStatus(!detailsStatus);
        }}
      >
        <h1 className={toggle ? "cursor-pointer" : "cursor-not-allowed"}>
          {command.name}
        </h1>
        <div
          className={
            "md:w-14 md:h-7 w-12 h-6 flex items-center rounded-full p-1 cursor-pointer " +
            (!toggle ? "bg-gray-300" : "bg-green-300")
          }
          onClick={() => {
            setToggle(!toggle);
            onClick();
          }}
        >
          <div
            className={
              "bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform transition-all ease-in-out " +
              (!toggle ? null : activeClass)
            }
          ></div>
        </div>
      </div>
      {detailsStatus && (
        <div className="py-2 flex-col space-y-2">
          <div className="flex-col space-y-5">
            {command.description && (
              <div className="flex-col space-y-2">
                <div>Description</div>
                <div className="bg-stone-900 px-4 py-2 rounded-xl">
                  {command.description}
                </div>
              </div>
            )}
            {command.aliases.length > 0 && (
              <div className="flex-col space-y-2">
                <div>Aliases</div>
                <div className="bg-stone-900 px-4 py-2 rounded-xl">
                  {command.aliases.join(", ")}
                </div>
              </div>
            )}
            {command.usage && (
              <div className="flex-col space-y-2">
                <div>Usage</div>
                <div
                  className="bg-stone-900 px-4 py-2 rounded-xl"
                  onClick={() => {
                    copy(`${prefix}${command.name}`);
                    toast(`Copied to clipboard!`);
                  }}
                >
                  {command.usage}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
