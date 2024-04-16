import apple from "./assets/apple.svg";
import discord from "./assets/discord.svg";
import facebook from "./assets/facebook.svg";
import instagram from "./assets/instagram-logo.png";
import paypal from "./assets/paypal.svg";
import reddit from "./assets/reddit.svg";
import snapchat from "./assets/snapchat.svg";
import telegram from "./assets/telegram-logo.png";
import tikTok from "./assets/tiktok.svg";
import weibo from "./assets/weibo.svg";
import x from "./assets/x-logo.png";

export const providers = {
  twitter: {
    type: "Social media",
    description:
      "Microblogging platform for sharing short posts and real-time updates.",
    imageSrc: x,
    link: "/provider/x",
    name: "X.com (Twitter)",
  },
  telegram: {
    type: "Social media",
    description:
      "Messaging app focusing on speed, security, and large group communication.",
    imageSrc: telegram,
    // link: "/provider/telegram",
    link: "",
    name: "Telegram",
  },
  instagram: {
    type: "Social media",
    description:
      "Visual platform for sharing photos, stories, and videos with a creative community.",
    imageSrc: instagram,
    // link: "/provider/instagram",
    link: "",
    name: "Instagram",
  },
  discord: {
    type: "Social media",
    description: "Streamline software projects, sprints, and bug tracking.",
    // link: "/provider/discrod",
    link: "",
    name: "Discord",
    imageSrc: discord,
  },
  facebook: {
    type: "Social media",
    description: "Streamline software projects, sprints, and bug tracking.",
    name: "Facebook",
    // link: "/provider/facebook",
    link: "",
    imageSrc: facebook,
  },
  tikTok: {
    type: "Social media",
    description: "Streamline software projects, sprints, and bug tracking.",
    name: "TikTok",
    // link: "/provider/tiktok",
    link: "",
    imageSrc: tikTok,
  },
  weibo: {
    type: "Social media",
    name: "Weibo",
    description: "Streamline software projects, sprints, and bug tracking.",
    // link: "/provider/weibo",
    link: "",
    imageSrc: weibo,
  },
  snapchat: {
    type: "Social media",
    name: "Snapchat",
    description: "Streamline software projects, sprints, and bug tracking.",
    // link: "/provider/snapchat",
    link: "",
    imageSrc: snapchat,
  },
  reddit: {
    type: "Social media",
    description: "Streamline software projects, sprints, and bug tracking.",
    name: "Reddit",
    // link: "/provider/reddit",
    link: "",
    imageSrc: reddit,
  },
  apple: {
    type: "Social media",
    description: "Streamline software projects, sprints, and bug tracking.",
    name: "Apple",
    // link: "/provider/apple",
    link: "",
    imageSrc: apple,
  },
  payPal: {
    type: "Social media",
    description: "Streamline software projects, sprints, and bug tracking.",
    name: "Paypal",
    // link: "/provider/paypal",
    link: "",
    imageSrc: paypal,
  },
};

export type Provider = keyof typeof providers;
