/**
 * Partner logos shown in the Partners logo wall.
 * Sourced from nsart.kz. Images live in /public/partners.
 * Language-independent, so kept out of the i18n dictionaries.
 */
export type PartnerLogo = {
  name: string;
  src: string;
  url?: string;
};

export const partnerLogos: PartnerLogo[] = [
  { name: "NITEC", src: "/partners/nitec.jpg", url: "https://nitec.kz" },
  { name: "KazDream", src: "/partners/kazdream.jpg", url: "https://kazdream.kz" },
  { name: "Juldizai", src: "/partners/juldizai.svg", url: "https://juldizai.kz/kk/" },
  { name: "MyCloud", src: "/partners/mycloud.jpg", url: "https://mycloud.kz" },
  { name: "SpaceLab", src: "/partners/spacelab.png", url: "https://spacelab.kz/ru" },
  { name: "Gharysh", src: "/partners/gharysh.webp", url: "https://www.gharysh.kz/" },
  { name: "Suburban Cloud", src: "/partners/suburban-cloud.png", url: "https://suburbancloud.ng/" },
  { name: "Eagale Soft", src: "/partners/eagale.png", url: "https://eagale.com/" },
  { name: "InfoTech", src: "/partners/infotech.png", url: "https://infotechgroup.com/" },
  { name: "AiMap", src: "/partners/aimap.png", url: "https://aimap.kz/" },
  { name: "QazTrade", src: "/partners/qaztrade.png", url: "https://qaztrade.org.kz/rus/" },
  { name: "EdTech KN", src: "/partners/edtechkn.png", url: "https://edtechkn.com/" },
  { name: "MyRent", src: "/partners/myrent.png" },
  { name: "AiLat", src: "/partners/ailat.png", url: "https://ailat.kz/ru" },
  { name: "Artisan Education", src: "/partners/artisan.png", url: "https://artisan.education/ru" },
  { name: "Paxaro Labs", src: "/partners/paxaro.png", url: "https://www.linkedin.com/company/paxarolabs/" },
  { name: "4Sight", src: "/partners/4sight.png", url: "https://www.4sight.com.pk" },
  { name: "Uneet", src: "/partners/uneet.png", url: "https://www.linkedin.com/company/uneet-kz/about/" },
  { name: "Alarcom", src: "/partners/alarcom.svg", url: "https://alarcom.kz/" },
];
