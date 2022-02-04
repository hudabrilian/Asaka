import { useEffect, useRef, useState } from "react";
import { GuildLink } from "../components/GuildLink";
import { GuildSkeleton } from "../components/GuildSkeleton";
import { Layout } from "../sections/Layout";
import { getUserGuilds } from "../utils/api";
import { motion } from "framer-motion";

type Guild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
};

export const MenuPage = () => {
  const [loading, setLoading] = useState(true);
  const [includedGuilds, setIncludedGuilds] = useState([]);
  const [excludedGuilds, setExcludedGuilds] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      getUserGuilds().then(({ data }: any) => {
        setIncludedGuilds(data.included);
        setExcludedGuilds(data.excluded);
        setLoading(false);
      });

      return () => {
        isMounted.current = false;
      };
    }
  }, []);

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 flex flex-col space-y-5 pb-10">
          {!loading ? (
            <>
              {includedGuilds?.map((guild: Guild) => (
                <GuildLink
                  guildId={guild!.id}
                  guildName={guild!.name}
                  guildIcon={guild!.icon}
                  included={true}
                  key={guild!.id}
                />
              ))}
              {excludedGuilds?.map((guild: Guild) => (
                <GuildLink
                  guildId={guild!.id}
                  guildName={guild!.name}
                  guildIcon={guild!.icon}
                  included={false}
                  key={guild!.id}
                />
              ))}
            </>
          ) : (
            <>
              <GuildSkeleton />
              <GuildSkeleton />
              <GuildSkeleton />
              <GuildSkeleton />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};
