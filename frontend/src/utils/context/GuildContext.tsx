import { createContext, useContext } from "react";

type GuildContextType = {
  guildId: string;
};

export const GuildContext = createContext<GuildContextType>({
  guildId: "",
});

export const useGuildContext = () => {
  return useContext(GuildContext);
};
