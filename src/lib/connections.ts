export const STEAM_CONNECTION_KEY = "tf2-guides-steam-connected";
export const ETF2CENTER_CONNECTION_KEY = "tf2-guides-etf2center-connected";

export const isSteamConnected = () => {
  return localStorage.getItem(STEAM_CONNECTION_KEY) === "true";
};

export const setSteamConnected = (connected: boolean) => {
  localStorage.setItem(STEAM_CONNECTION_KEY, String(connected));
};

export const isEtf2CenterConnected = () => {
  return localStorage.getItem(ETF2CENTER_CONNECTION_KEY) === "true";
};

export const setEtf2CenterConnected = (connected: boolean) => {
  localStorage.setItem(ETF2CENTER_CONNECTION_KEY, String(connected));
};
