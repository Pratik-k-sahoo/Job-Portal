import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).fields([
	{ name: "pdf", maxCount: 1 },
	{ name: "image", maxCount: 1 },
]);
// export const singleUpload = multer({ storage }).single("file");
