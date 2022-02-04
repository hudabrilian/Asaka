import CryptoJS from "crypto-js";

const SECRET_PASSPHRASE = process.env.SECRET_PASSPHRASE || "";

const encrypt = (token: string | CryptoJS.lib.WordArray) => {
  return CryptoJS.AES.encrypt(token, SECRET_PASSPHRASE);
};

const decrypt = (token: string | CryptoJS.lib.CipherParams) => {
  return CryptoJS.AES.decrypt(token, SECRET_PASSPHRASE);
};

const getMutualGuilds = ({
  userGuilds,
  botGuilds,
}: {
  userGuilds: any;
  botGuilds: any;
}) => {
  const validGuilds = userGuilds.filter(
    (guild: { permissions: number }) => (guild.permissions & 0x20) === 0x20
  );
  const included: any[] = [];
  const excluded = validGuilds.filter((guild: { id: any }) => {
    const findGuild = botGuilds.find((g: { id: any }) => g.id === guild.id);
    if (!findGuild) return guild;
    included.push(findGuild);
  });
  return { included, excluded };
};

export { encrypt, decrypt, getMutualGuilds };
