import { Link } from "react-router-dom";

export const GuildLink = ({
  guildId,
  guildName,
  included,
  guildIcon,
}: {
  guildId: string;
  guildName: string;
  guildIcon: string;
  included: boolean;
}) => {
  return (
    <Link
      to={included ? `/dashboard/${guildId}` : `/add/${guildId}`}
      className="flex items-center space-x-5 px-10 py-6 bg-stone-700 rounded-2xl font-bold text-lg hover:scale-105 hover:bg-stone-600 transition ease-in-out"
    >
      <div className="rounded-full h-12 w-12 relative flex justify-center items-center">
        <div className="absolute">
          {guildIcon ? (
            <img
              className="rounded-full"
              src={`https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.png`}
              alt={guildName}
            />
          ) : (
            guildName.charAt(0)
          )}
        </div>
      </div>
      <div>
        <div>{guildName}</div>
        <div className="text-sm font-normal">
          {included ? "Manage Server" : "Add to server"}
        </div>
      </div>
    </Link>
  );
};
