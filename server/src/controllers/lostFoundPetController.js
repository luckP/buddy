import LostFoundPet from '../models/lostFoundPetSchema.js';

/**
 * @route   POST /api/lost-found-pets
 * @desc    Create a lost or found pet report
 * @access  Private
 * @param   {Object} req - Express request object
 * @param   {Object} req.body - Request payload
 * @param   {string} req.body.petName - Pet's name
 * @param   {string} req.body.description - Pet's description
 * @param   {Array} req.body.images - Array of image URLs
 * @param   {Object} req.body.location - GeoJSON object with `type` and `coordinates`
 * @param   {string} req.body.status - Lost, found, or reunited
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with created pet report
 */
export const createLostFoundPet = async (req, res) => {
  try {
    const { petName, description, images, location, status } = req.body;

    if (!location || !location.type || !location.coordinates) {
      return res.status(400).json({ error: 'Location is required and must be a valid GeoJSON Point.' });
    }

    const lostFoundPet = new LostFoundPet({
      petName,
      description,
      images,
      location,
      status: status || 'lost'
    });

    await lostFoundPet.save();
    res.status(201).json(lostFoundPet);
  } catch (error) {
    console.error('Error creating lost/found pet report:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   GET /api/lost-found-pets
 * @desc    Get all lost or found pet reports (with optional filtering by status)
 * @access  Public
 * @param   {Object} req - Express request object
 * @param   {string} [req.query.status] - Filter by pet status (lost, found, reunited)
 * @param   {Object} res - Express response object
 * @returns {Array} JSON response with list of pet reports
 */
export const getLostFoundPets = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};

    const pets = await LostFoundPet.find(query).sort({ createdAt: -1 });
    res.json(pets);
  } catch (error) {
    console.error('Error retrieving lost/found pet reports:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   GET /api/lost-found-pets/:id
 * @desc    Get a single lost or found pet report by ID
 * @access  Public
 * @param   {Object} req - Express request object
 * @param   {string} req.params.id - Pet report ID
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with the requested pet report
 */
export const getLostFoundPetById = async (req, res) => {
  try {
    const pet = await LostFoundPet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ error: 'Pet report not found.' });
    }

    res.json(pet);
  } catch (error) {
    console.error('Error retrieving lost/found pet report:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   PUT /api/lost-found-pets/:id
 * @desc    Update a lost or found pet report (Only by owner)
 * @access  Private
 * @param   {Object} req - Express request object
 * @param   {string} req.params.id - Pet report ID
 * @param   {Object} req.body - Updated pet report data
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with updated pet report
 */
export const updateLostFoundPet = async (req, res) => {
  try {
    const updatedPet = await LostFoundPet.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedPet) {
      return res.status(404).json({ error: 'Pet report not found.' });
    }

    res.json(updatedPet);
  } catch (error) {
    console.error('Error updating lost/found pet report:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};

/**
 * @route   DELETE /api/lost-found-pets/:id
 * @desc    Delete a lost or found pet report
 * @access  Private
 * @param   {Object} req - Express request object
 * @param   {string} req.params.id - Pet report ID
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with deletion confirmation
 */
export const deleteLostFoundPet = async (req, res) => {
  try {
    const deletedPet = await LostFoundPet.findByIdAndDelete(req.params.id);

    if (!deletedPet) {
      return res.status(404).json({ error: 'Pet report not found.' });
    }

    res.json({ message: 'Pet report deleted successfully.' });
  } catch (error) {
    console.error('Error deleting lost/found pet report:', error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
};
