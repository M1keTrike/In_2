const baseURL = "https://margaritasdesignapi.integrador.xyz/uploads/";

const imageModel = require("../models/imageModel");

const createImage = async (req, res) => {
  try {
    const image = {
      filename: req.file.filename,
      path: req.file.path.replace(/\\/g, "/"),
      mimetype: req.file.mimetype,
    };
    const id = await imageModel.createImage(image);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getImageById = async (req, res) => {
  try {
    const image = await imageModel.getImageById(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    image.url = baseURL + image.filename;
    image.path = image.path.replace(/\\/g, "/");
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await imageModel.getAllImages();
    images.forEach((image) => {
      image.url = baseURL + image.filename;
      image.path = image.path.replace(/\\/g, "/");
    });
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateImage = async (req, res) => {
  try {
    const image = {
      filename: req.file.filename,
      path: req.file.path.replace(/\\/g, "/"),
      mimetype: req.file.mimetype,
    };
    await imageModel.updateImage(req.params.id, image);
    res.status(200).json({ message: "Image updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    await imageModel.deleteImage(req.params.id);
    res.status(200).json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createImage,
  getImageById,
  getAllImages,
  updateImage,
  deleteImage,
};
