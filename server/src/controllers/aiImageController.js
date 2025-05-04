import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { API_BASE_URL } from "../config/constants.js";
import AIImage from "../models/aiImageSchema.js";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export const getAllImages = async (req, res) => {
    try {
      const images = await AIImage.find({ isPublic: true })
        .sort({ createdAt: -1 })
        .select("prompt imageUrl referenceImageUrl likes createdAt");
  
      res.status(200).json(images);
    } catch (err) {
      console.error("Fetch Images Error:", err);
      res.status(500).json({ error: "Failed to fetch images." });
    }
  };  


  export const generateImage = async (req, res) => {
    const { prompt } = req.body;
    const userId = req.user._id;
  
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }
  
    try {
      // 1. Save reference image (if provided)
      let referenceImageUrl = "";
      let imageDescription = "";
  
      if (req.file) {
        const ext = path.extname(req.file.originalname);
        const uniqueName = `${uuidv4()}${ext}`;
        const refDir = path.join("src/uploads", "references", userId.toString());
        fs.mkdirSync(refDir, { recursive: true });
  
        const refPath = path.join(refDir, uniqueName);
        fs.renameSync(req.file.path, refPath);
        referenceImageUrl = `${API_BASE_URL}/uploads/references/${userId}/${uniqueName}`;
  
        // 2. Use GPT-4o to describe the image
        const analysis = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "Describe the following image accurately." },
                { type: "image_url", image_url: { url: referenceImageUrl } },
              ],
            },
          ],
        });
  
        imageDescription = analysis.choices[0]?.message?.content?.trim() || "";
      }
  
      // 3. Combine descriptions
      const finalPrompt = imageDescription
        ? `${imageDescription}. ${prompt}`
        : prompt;
  
      // 4. Generate image with DALL·E
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: finalPrompt,
        n: 1,
        size: "1024x1024",
        response_format: "url",
      });
  
      const generatedUrl = response.data[0]?.url;
      if (!generatedUrl) {
        return res.status(500).json({ error: "Image generation failed." });
      }
  
      // 5. Save generated image locally using fetch
      const genExt = ".png";
      const genName = `${uuidv4()}${genExt}`;
      const genDir = path.join("src/uploads", "generated", userId.toString());
      fs.mkdirSync(genDir, { recursive: true });
      const genPath = path.join(genDir, genName);
  
      const imageResponse = await fetch(generatedUrl);
  
      if (!imageResponse.ok) {
        throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
      }
  
      const writer = fs.createWriteStream(genPath);
      await new Promise((resolve, reject) => {
        imageResponse.body.pipe(writer);
        imageResponse.body.on("error", reject);
        writer.on("finish", resolve);
      });
  
      const imageUrl = `${API_BASE_URL}/uploads/generated/${userId}/${genName}`;
  
      // 6. Save to DB
      await AIImage.create({
        user: userId,
        prompt,
        imageUrl,
        referenceImageUrl,
      });
  
      res.status(200).json({ imageUrl, referenceImageUrl });
  
    } catch (err) {
      console.error("Image Generation Error:", err);
      res.status(500).json({ error: "Image generation failed." });
    }
  };

export const likeImage = async (req, res) => {
  const userId = req.user._id;
  const { imageId } = req.params;

  const image = await AIImage.findById(imageId);
  if (!image) return res.status(404).json({ error: "Image not found." });

  if (image.likes.includes(userId)) {
    return res.status(400).json({ error: "You already liked this image." });
  }

  image.likes.push(userId);
  await image.save();

  res.status(200).json({ message: "Liked!", totalLikes: image.likes.length });
};


export const commentImage = async (req, res) => {
    const userId = req.user._id;
    const { imageId } = req.params;
    const { text } = req.body;
  
    if (!text?.trim()) {
      return res.status(400).json({ error: "Comment text is required." });
    }
  
    const image = await AIImage.findById(imageId);
    if (!image) return res.status(404).json({ error: "Image not found." });
  
    image.comments.push({ user: userId, text });
    await image.save();
  
    res.status(200).json({ message: "Comment added." });
  };
  