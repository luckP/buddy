import PetFriendlyPlace from '../models/petFriendlyPlaceSchema.js';

/**
 * @route   POST /api/pet-friendly-places
 * @desc    Create a pet-friendly place entry
 * @access  Private
 * @param   {Object} req - Express request object
 * @param   {Object} req.body - Request payload
 * @param   {string} req.body.name - Name of the place
 * @param   {string} req.body.description - Short description
 * @param   {Array} req.body.images - Array of image URLs
 * @param   {Object} req.body.location - GeoJSON object with `type` and `coordinates`
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with created place entry
 */
export const createPetFriendlyPlace = async (req, res) => {
  try {
    const { name, description, images, location } = req.body;

    if (!location || !location.type || !location.coordinates) {
      return res.status(400).json({ error: 'Location is required and must be a valid GeoJSON Point.' });
    }

    const petPlace = new PetFriendlyPlace({
      name,
      description,
      images,
      location
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
 * @desc    Get all pet-friendly places (with optional geolocation filtering)
 * @access  Public
 * @param   {Object} req - Express request object
 * @param   {Object} req.query - Query parameters
 * @param   {number} req.query.lat - Latitude for filtering
 * @param   {number} req.query.lng - Longitude for filtering
 * @param   {number} req.query.radius - Search radius in kilometers
 * @param   {Object} res - Express response object
 * @returns {Array} JSON response with list of places
 */
export const getPetFriendlyPlaces = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    let query = {};

    if (lat && lng && radius) {
      query.location = {
        $geoWithin: {
          $centerSphere: [[parseFloat(lng), parseFloat(lat)], parseFloat(radius) / 6378.1] // Earth's radius in km
        }
      };
    }

    const places = await PetFriendlyPlace.find(query).sort({ createdAt: -1 });
    res.json(places);
  } catch (error) {
    console.error('Error retrieving pet-friendly places:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   GET /api/pet-friendly-places/:id
 * @desc    Get a single pet-friendly place by ID
 * @access  Public
 * @param   {Object} req - Express request object
 * @param   {string} req.params.id - Place ID
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with place details
 */
export const getPetFriendlyPlaceById = async (req, res) => {
  try {
    const place = await PetFriendlyPlace.findById(req.params.id);

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
 * @desc    Update a pet-friendly place (Only by authorized users)
 * @access  Private
 * @param   {Object} req - Express request object
 * @param   {string} req.params.id - Place ID
 * @param   {Object} req.body - Updated place data
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with updated place
 */
export const updatePetFriendlyPlace = async (req, res) => {
  try {
    const updatedPlace = await PetFriendlyPlace.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedPlace) {
      return res.status(404).json({ error: 'Place not found.' });
    }

    res.json(updatedPlace);
  } catch (error) {
    console.error('Error updating pet-friendly place:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   DELETE /api/pet-friendly-places/:id
 * @desc    Delete a pet-friendly place
 * @access  Private
 * @param   {Object} req - Express request object
 * @param   {string} req.params.id - Place ID
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with deletion confirmation
 */
export const deletePetFriendlyPlace = async (req, res) => {
  try {
    const deletedPlace = await PetFriendlyPlace.findByIdAndDelete(req.params.id);

    if (!deletedPlace) {
      return res.status(404).json({ error: 'Place not found.' });
    }

    res.json({ message: 'Place deleted successfully.' });
  } catch (error) {
    console.error('Error deleting pet-friendly place:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
