module.exports = {
  index:  clothesItemsIndex,
  create: clothesItemsCreate,
  show:   clothesItemsShow,
  update: clothesItemsUpdate,
  delete: clothesItemsDelete
};

const ClothesItem = require('../models/clothesItem');

function clothesItemsIndex(req, res) {
  ClothesItem.find((err, clothesItems) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    return res.status(200).json({ clothesItems });
  });
}

function clothesItemsCreate(req, res) {
  const clothesItem = new ClothesItem(req.body.clothesItem);
  clothesItem.save((err, clothesItem) => {
    if (err) return res.status(500).json({ messsage: "Something went wrong." });
    return res.status(201).json({ clothesItem });
  });
}

function clothesItemsShow(req, res) {
  ClothesItem.findById(req.params.id, (err, clothesItem) => {
    if (err) return res.status(500).json({ message: "Something went wrong" });
    if (!clothesItem) return res.status(404).json({ message: "ClothesItem not found." });
    return res.status(200).json({ clothesItem });
  });
}

function clothesItemsUpdate(req, res) {
  ClothesItem.findByIdAndUpdate(req.params.id, req.body.clothesItem, { new: true },  (err, clothesItem) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!clothesItem) return res.status(404).json({ message: "ClothesItem not found." });
    return res.status(200).json({ clothesItem });
  });
}

function clothesItemsDelete(req, res) {
  ClothesItem.findByIdAndRemove(req.params.id, (err, clothesItem) => {
    if (err) return res.status(500).json({ message: "Something went wrong." });
    if (!clothesItem) return res.status(404).json({ message: "ClothesItem not found." });
    return res.status(204).send();
  });
}
