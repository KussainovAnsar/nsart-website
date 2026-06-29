import sharp from "sharp";
const D = "C:/Users/Ansar/Downloads";
const OUT = "./public/team";
const map = [
  ["Нургожа CEO.jpg", "nurgozha.jpg"],
  ["Мади IP manager.jpg", "madi.jpg"],
  ["Айнара Finance & Accounting Manager.jpg", "ainara.jpg"],
  ["Ансар AI Solutions Engineer.jpg", "ansar.jpg"],
  ["Айдар Operating project manager.jpg", "aidar.jpg"],
];
for (const [src, dst] of map) {
  await sharp(`${D}/${src}`)
    .rotate()
    .resize(640, 640, { fit: "cover", position: "attention" })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(`${OUT}/${dst}`);
  console.log("ok", dst);
}
