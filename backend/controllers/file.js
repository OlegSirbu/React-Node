const { File, validate } = require("../models/file");

const BASE_URL = "https://ed-4920280845647872.educative.run";

exports.upload = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, description } = req.body;
    let path = req.file.path;

    const file = await File.create({
      name,
      createdBy: req.user.user_id,
      description,
      createdAt: Date.now(),
      filePath: BASE_URL + "/" + path,
    });

    res.status(200).json({ message: "File uploaded successfully", data: file });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    const { createdBy, fileId } = req.params;

    const files = await File.findOne({ _id: fileId, createdBy: createdBy });

    if (!files) {
      return res.status(404).send("The requested file does not exist");
    }

    res
      .status(200)
      .json({ message: "File retrieved successfully", data: file });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

exports.searchFiles = async (req, res) => {
  try {
    const filter = {};

    if (req.query.name) filter.name = /req.query.name/;
    if (req.query.description) filter.description = /req.query.description/;
    if (req.query.createdAt) filter.createdAt = req.query.createdAt;

    const files = await File.find(filter);

    res
      .status(200)
      .json({ message: "Files retrieved successfully", data: files });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};
