import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});
// const filePath = "./uploads/1743943980684-JJCODE404.png";

console.log(cloudinary.config());
// async function testCloudinary() {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       folder: "myapp_files",
//       timeout: 60000,
//     });

//     console.log(result);
//     console.log("✅ Upload succeeded!");
//     console.log("Image URL:", result.secure_url);
//   } catch (error) {
//     console.error("❌ Upload failed:");
//     console.dir(error, { depth: null });
//   }
// }

export { cloudinary };
