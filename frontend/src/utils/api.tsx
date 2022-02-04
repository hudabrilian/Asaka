import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const logoutUser = () => {
  return axios.get(`${API_URL}/auth/logout`, {
    withCredentials: true,
  });
};

export const getUserDetails = () => {
  return axios.get(`${API_URL}/auth`, { withCredentials: true });
};

export const getUserGuilds = () => {
  return axios.get(`${API_URL}/discord/guilds`, {
    withCredentials: true,
  });
};

export const getGuild = (guildId: string) => {
  return axios.get(`${API_URL}/discord/guild/${guildId}`, {
    withCredentials: true,
  });
};

export const getStatusGuild = (guildId: string) => {
  return axios.get(`${API_URL}/discord/guild/${guildId}/status`, {
    withCredentials: true,
  });
};

export const updateStatusGuild = (
  guildId: string,
  type: string,
  payload: string
) => {
  return axios.put(
    `${API_URL}/discord/guild/${guildId}/status/${type}`,
    {
      payload,
    },
    { withCredentials: true }
  );
};

export const getPrefixGuild = (guildId: string) => {
  return axios.get(`${API_URL}/discord/guild/${guildId}/prefix`, {
    withCredentials: true,
  });
};

export const getGuildChannels = (guildId: string) => {
  return axios.get(`${API_URL}/discord/guild/${guildId}/channels`, {
    withCredentials: true,
  });
};

export const getWelcomeGuild = (guildId: string) => {
  return axios.get(`${API_URL}/discord/guild/${guildId}/welcome`, {
    withCredentials: true,
  });
};

export const getCurseWords = (guildId: string) => {
  return axios.get(`${API_URL}/discord/guild/${guildId}/anti-curse`, {
    withCredentials: true,
  });
};

export const updatePrefixGuild = (guildId: string, prefix: string) => {
  return axios.put(
    `${API_URL}/discord/guild/${guildId}/prefix`,
    {
      prefix,
    },
    { withCredentials: true }
  );
};

export const updateWelcomeGuild = (
  guildId: string,
  channelId: string,
  message: string
) => {
  return axios.put(
    `${API_URL}/discord/guild/${guildId}/welcome`,
    {
      channel: channelId,
      message,
    },
    { withCredentials: true }
  );
};

export const updateCurseWords = (guildId: string, words: string) => {
  return axios.put(
    `${API_URL}/discord/guild/${guildId}/anti-curse`,
    {
      words,
    },
    { withCredentials: true }
  );
};
