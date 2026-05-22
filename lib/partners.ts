/**
 * Partner logos shown in the Partners logo wall.
 * Sourced from nsart.kz (Tilda CDN, full-size). Images live in /public/partners.
 * Language-independent, so kept out of the i18n dictionaries.
 *
 * Note: file names are kept as-downloaded from the Tilda CDN; `name` reflects
 * what each logo actually shows.
 */
export type PartnerLogo = {
  name: string;
  src: string;
  url?: string;
};

export const partnerLogos: PartnerLogo[] = [
  { name: "NITEC", src: "/partners/nitec.jpg", url: "https://nitec.kz" },
  { name: "KazDream", src: "/partners/kazdream.jpg", url: "https://kazdream.kz" },
  { name: "BI Group Charitable Fund", src: "/partners/juldizai.svg", url: "https://juldizai.kz/kk/" },
  { name: "KT Cloud Lab", src: "/partners/bigroupfund.jpg" },
  { name: "SpaceLab", src: "/partners/ktcloudlab.png", url: "https://spacelab.kz/ru" },
  { name: "KGS Space Technologies", src: "/partners/spacelab.webp" },
  { name: "Suburban Cloud", src: "/partners/kgs.png", url: "https://suburbancloud.ng/" },
  { name: "Eagale Soft", src: "/partners/suburbancloud.png", url: "https://eagale.com/" },
  { name: "InfoTech", src: "/partners/eagale.png", url: "https://infotechgroup.com/" },
  { name: "AiMap", src: "/partners/aimap.png", url: "https://aimap.kz/" },
  { name: "QazTrade", src: "/partners/qaztrade.png", url: "https://qaztrade.org.kz/rus/" },
  { name: "EdTech KN", src: "/partners/edtechkn.png", url: "https://edtechkn.com/" },
  { name: "MyRent", src: "/partners/infotech.png" },
  { name: "AiLat", src: "/partners/myrent.png", url: "https://ailat.kz/ru" },
  { name: "Artisan Education", src: "/partners/ailat.png", url: "https://artisan.education/ru" },
  { name: "Paxaro Labs", src: "/partners/artisan.png", url: "https://www.linkedin.com/company/paxarolabs/" },
  { name: "4Sight Technologies", src: "/partners/paxaro.png", url: "https://www.4sight.com.pk" },
  { name: "Uneet", src: "/partners/uneet.png", url: "https://www.linkedin.com/company/uneet-kz/about/" },
  { name: "Alarcom", src: "/partners/alarcom.svg", url: "https://alarcom.kz/" },
];
