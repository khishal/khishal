export const CONFIG = {
  username: process.env.GITHUB_USERNAME,

  level: {
    contributionPerLevel: 50
  },

  rank: [
    { name: "Bronze", min: 0 },
    { name: "Silver", min: 20 },
    { name: "Gold", min: 50 },
    { name: "Platinum", min: 100 },
    { name: "Diamond", min: 200 },
    { name: "Mythic", min: 400 }
  ],

  colors: {
    background: "#0B1020",
    card: "#141A2F",
    primary: "#00E5FF",
    secondary: "#7C4DFF",
    text: "#FFFFFF",
    subtext: "#94A3B8",
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444"
  },

  updateIntervalHours: 6
};
