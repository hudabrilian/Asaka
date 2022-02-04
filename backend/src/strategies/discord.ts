import passport from "passport";
import DiscordStrategy from "passport-discord";
import User from "../database/schemas/User";
import { encrypt } from "../utils/utils";
import OAuth2Credentials from "../database/schemas/OAuth2Credentials";

declare global {
  namespace Express {
    interface User {
      discordId: string;
    }
  }
}

passport.serializeUser((user, done) => {
  done(null, user.discordId);
});

passport.deserializeUser(async (discordId, done) => {
  const user = await User.findOne({ discordId });
  return done(null, user);
  // return user ? done(null, user) : done(null, null);
  // try {
  //   const user = await User.findOne({ discordId });
  //   return user ? done(null, user) : done(null, null);
  // } catch (err) {
  //   console.log(err);
  //   done(err, null);
  // }
});

const DASHBOARD_CLIENT_ID = process.env.DASHBOARD_CLIENT_ID!;
const DASHBOARD_CLIENT_SECRET = process.env.DASHBOARD_CLIENT_SECRET!;
const DASHBOARD_CALLBACK_URL = process.env.DASHBOARD_CALLBACK_URL;

passport.use(
  new DiscordStrategy(
    {
      clientID: DASHBOARD_CLIENT_ID,
      clientSecret: DASHBOARD_CLIENT_SECRET,
      callbackURL: DASHBOARD_CALLBACK_URL,
      scope: ["identify", "guilds"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const encryptedAccessToken = encrypt(accessToken).toString();
      const encryptedRefreshToken = encrypt(refreshToken).toString();
      const { id, username, discriminator, avatar, guilds } = profile;
      // console.log(id, username, discriminator, avatar, guilds);
      try {
        const findUser = await User.findOneAndUpdate(
          { discordId: id },
          {
            discordTag: `${username}#${discriminator}`,
            avatar,
            guilds,
          },
          { new: true }
        );
        const findCredentials = await OAuth2Credentials.findOneAndUpdate(
          { discordId: id },
          {
            accessToken: encryptedAccessToken,
            refreshToken: encryptedRefreshToken,
          }
        );
        if (findUser) {
          if (!findCredentials) {
            const newCredentials = await OAuth2Credentials.create({
              accessToken: encryptedAccessToken,
              refreshToken: encryptedRefreshToken,
              discordId: id,
            });
          }
          return done(null, findUser);
        } else {
          const newUser = await User.create({
            discordId: id,
            discordTag: `${username}#${discriminator}`,
            avatar,
            guilds,
          });
          const newCredentials = await OAuth2Credentials.create({
            accessToken: encryptedAccessToken,
            refreshToken: encryptedRefreshToken,
            discordId: id,
          });
          return done(null, newUser);
        }
      } catch (err: any) {
        console.log(err);
        return done(err);
      }
    }
  )
);
