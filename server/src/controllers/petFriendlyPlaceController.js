import { API_BASE_URL } from '../config/constants.js';
import PetFriendlyPlace from '../models/petFriendlyPlaceSchema.js';

/**
 * @route   POST /api/pet-friendly-places
 * @desc    Create a pet-friendly place entry
 * @access  Private
 */
export const createPetFriendlyPlace = async (req, res) => {
  try {
    const { name, description, images, location, category } = req.body;

    if (!location || !location.type || !location.coordinates) {
      return res.status(400).json({ error: 'Location is required and must be a valid GeoJSON Point.' });
    }

    const petPlace = new PetFriendlyPlace({
      name,
      description,
      images,
      location,
      category
    });

    await petPlace.save();
    res.status(201).json(petPlace);
  } catch (error) {
    console.error('Error creating pet-friendly place:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   GET /api/pet-friendly-places
 * @desc    Get all active pet-friendly places
 * @access  Public
 */
export const getPetFriendlyPlaces = async (req, res) => {
  try {

    const places = await PetFriendlyPlace.find({ is_deleted: false }).sort({ created_at: -1 });

    // ✅ Format image URLs correctly
    const formattedPlaces = places.map(place => ({
      ...place.toObject(),
      images: place.images.map(imgPath => `${API_BASE_URL}${imgPath}`) // Append base URL for images
    }));

    res.json(formattedPlaces);
  } catch (error) {
    console.error('Error retrieving pet-friendly places:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   GET /api/pet-friendly-places/:id
 * @desc    Get a single pet-friendly place by ID
 * @access  Public
 */
export const getPetFriendlyPlaceById = async (req, res) => {
  try {
    const place = await PetFriendlyPlace.findOne({ _id: req.params.id, is_deleted: false });

    if (!place) {
      return res.status(404).json({ error: 'Place not found.' });
    }

    res.json(place);
  } catch (error) {
    console.error('Error retrieving pet-friendly place:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   PUT /api/pet-friendly-places/:id
 * @desc    Update a pet-friendly place
 * @access  Private
 */
export const updatePetFriendlyPlace = async (req, res) => {
  try {
    const updatedPlace = await PetFriendlyPlace.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedPlace || updatedPlace.is_deleted) {
      return res.status(404).json({ error: 'Place not found.' });
    }

    res.json(updatedPlace);
  } catch (error) {
    console.error('Error updating pet-friendly place:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   PUT /api/pet-friendly-places/:id/status
 * @desc    Update the `is_active` status of a place
 * @access  Private
 */
export const updatePlaceStatus = async (req, res) => {
  try {
    const { is_active } = req.body;

    if (typeof is_active !== 'boolean') {
      return res.status(400).json({ error: 'is_active must be a boolean value.' });
    }

    const updatedPlace = await PetFriendlyPlace.findByIdAndUpdate(
      req.params.id,
      { is_active, updated_at: Date.now() },
      { new: true }
    );

    if (!updatedPlace || updatedPlace.is_deleted) {
      return res.status(404).json({ error: 'Place not found.' });
    }

    res.json(updatedPlace);
  } catch (error) {
    console.error('Error updating place status:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   DELETE /api/pet-friendly-places/:id
 * @desc    Soft delete a pet-friendly place
 * @access  Private
 */
export const deletePetFriendlyPlace = async (req, res) => {
  try {
    const deletedPlace = await PetFriendlyPlace.findByIdAndUpdate(
      req.params.id,
      { is_deleted: true, updated_at: Date.now() },
      { new: true }
    );

    if (!deletedPlace) {
      return res.status(404).json({ error: 'Place not found.' });
    }

    res.json({ message: 'Place deleted successfully (soft delete).' });
  } catch (error) {
    console.error('Error deleting pet-friendly place:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
