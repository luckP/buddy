
import fs from "fs";
import path from "path";
import LostFoundPet from "../models/lostFoundPetSchema.js";
import { API_BASE_URL } from "../config/constants.js";

/**
 * @route   POST /api/lost-found-pets
 * @desc    Create a lost or found pet report
 * @access  Private
 */
export const createLostFoundPet = async (req, res) => {
  try {
    console.log("🟢 DEBUG: Received Request Data:", req.body);
    let { petName, description, location, status } = req.body;

    // Ensure `location` is correctly parsed
    if (typeof location === "string") {
      try {
        location = JSON.parse(location);
      } catch (error) {
        console.error("🚨 ERROR: Failed to parse location:", error);
        return res.status(400).json({ error: "Location must be a valid GeoJSON object." });
      }
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: 'User authentication required' });
    }

    // Validate GeoJSON structure
    if (!location || !location.type || !location.coordinates || location.type !== "Point" || !Array.isArray(location.coordinates)) {
      console.error("🚨 ERROR: Invalid location data:", location);
      return res.status(400).json({ error: "Location is required and must be a valid GeoJSON Point." });
    }

    // Define user directory
    const userUploadsPath = path.join(process.cwd(), `uploads/lostFoundPets/${req.user._id}/`);
    if (!fs.existsSync(userUploadsPath)) {
      fs.mkdirSync(userUploadsPath, { recursive: true });
    }

    // Move uploaded files to the correct folder
    const imageUrls = req.files?.map(file => {
      const newFilePath = path.join(userUploadsPath, file.filename);
      fs.renameSync(file.path, newFilePath); // Move file to the correct folder
      return `/uploads/lostFoundPets/${req.user._id}/${file.filename}`;
    }) || [];

    console.log("🟢 DEBUG: Image URLs stored in DB:", imageUrls);

    // Create and save the new report
    const lostFoundPet = new LostFoundPet({
      author: req.user._id, // ✅ Store user as the author
      petName,
      description,
      images: imageUrls,
      location,
      status: status || "lost",
    });

    await lostFoundPet.save();
    res.status(201).json(lostFoundPet);
  } catch (error) {
    console.error("🚨 ERROR creating lost/found pet report:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};






/**
 * @route   GET /api/lost-found-pets
 * @desc    Get all lost or found pet reports (with optional filtering)
 * @access  Public
 */
export const getLostFoundPets = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const pets = await LostFoundPet.find(query).sort({ createdAt: -1 });
    res.json(pets);
  } catch (error) {
    console.error("Error retrieving lost/found pet reports:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

/**
 * @route   GET /api/lost-found-pets/nearby
 * @desc    Get lost/found pets within a certain radius (default 5km)
 * @access  Public
 */

export const getNearbyLostFoundPets = async (req, res) => {
  try {
    const { latitude, longitude, radius = 5 } = req.query; // Radius in km

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    const pets = await LostFoundPet.find({
      location: {
        $geoWithin: {
          $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], radius / 6378.1], // Convert km to radians
        },
      },
    }).populate("author", "username profileImage"); // Include author details

    // ✅ Format image URLs correctly
    const formattedPets = pets.map(pet => ({
      ...pet.toObject(),
      images: pet.images.map(imgPath => `${API_BASE_URL}${imgPath}`), // Append base URL for images
    }));

    res.json(formattedPets);
  } catch (error) {
    console.error("Error fetching nearby lost/found pet reports:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};


/**
 * @route   GET /api/lost-found-pets/:id
 * @desc    Get a single lost or found pet report by ID
 * @access  Public
 */
export const getLostFoundPetById = async (req, res) => {
  try {
    const pet = await LostFoundPet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ error: "Pet report not found." });
    }

    res.json(pet);
  } catch (error) {
    console.error("Error retrieving lost/found pet report:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

/**
 * @route   PUT /api/lost-found-pets/:id
 * @desc    Update a lost or found pet report
 * @access  Private
 */
export const updateLostFoundPet = async (req, res) => {
  try {
    const updatedPet = await LostFoundPet.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedPet) {
      return res.status(404).json({ error: "Pet report not found." });
    }

    res.json(updatedPet);
  } catch (error) {
    console.error("Error updating lost/found pet report:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};

/**
 * @route   DELETE /api/lost-found-pets/:id
 * @desc    Delete a lost or found pet report
 * @access  Private
 */
export const deleteLostFoundPet = async (req, res) => {
  try {
    const deletedPet = await LostFoundPet.findByIdAndDelete(req.params.id);

    if (!deletedPet) {
      return res.status(404).json({ error: "Pet report not found." });
    }

    res.json({ message: "Pet report deleted successfully." });
  } catch (error) {
    console.error("Error deleting lost/found pet report:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
};
