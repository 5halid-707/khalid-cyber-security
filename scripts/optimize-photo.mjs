import sharp from "sharp";
import fs from "fs";

const input = "public/khalid-real.jpg";

// 1. Optimized portrait (square, web-ready, smaller file)
await sharp(input)
  .resize(800, 800, { fit: "cover", position: "attention" })
  .jpeg({ quality: 85, progressive: true, mozjpeg: true })
  .toFile("public/khalid-portrait-opt.jpg");

// 2. Small avatar for navbar/hero (round-friendly, square)
await sharp(input)
  .resize(120, 120, { fit: "cover", position: "attention" })
  .jpeg({ quality: 90, progressive: true })
  .toFile("public/khalid-avatar.jpg");

console.log("✓ Generated optimized portrait + avatar");
console.log(
  "Portrait:",
  fs.statSync("public/khalid-portrait-opt.jpg").size,
  "bytes"
);
console.log(
  "Avatar:",
  fs.statSync("public/khalid-avatar.jpg").size,
  "bytes"
);
