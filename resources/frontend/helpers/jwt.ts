export const setupToken = (token: string, ttlInSeconds: number): void => {
  const tokenTime: number = Math.floor(Date.now() / 1000 + ttlInSeconds);
  localStorage.setItem("token", token);
  localStorage.setItem("ttl", tokenTime.toString());
};
