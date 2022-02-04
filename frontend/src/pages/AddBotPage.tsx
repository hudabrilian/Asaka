import { useEffect } from "react";
import { useParams } from "react-router";

export const AddBotPage = () => {
  const params = useParams();

  useEffect(() => {
    window.location.replace(
      "https://discord.com/api/oauth2/authorize?client_id=798155515384299521&permissions=8&scope=bot%20applications.commands&guild_id=" +
        params.id
    );
  }, []);

  return (
    <div className="text-center text-white font-bold text-3xl py-10 animate animate-pulse">
      Redirecting ...
    </div>
  );
};
