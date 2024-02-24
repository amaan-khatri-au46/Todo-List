const router = require("express").Router();

const todoItem = require("../models/todoItem");

router.get("/item", async (req, res) => {
  try {
    const allTodoItems = await todoItem.find({});
    res.status(200).json(allTodoItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve todos" });
  }
});

router.post("/item", async (req, res) => {
  try {
    const newItem = new todoItem({ item: req.body.item });
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (error) {
    res.status(500).json({ error: "Failed To Add Todo" });
  }
});

router.put("/item/:id", async (req, res) => {
  try {
    const updatedItem = await todoItem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json("Item Updated");
  } catch (error) {
    res.status(500).json({ error: "Failed to edit todos" });
  }
});

router.delete("/item/:id", async (req, res) => {
  try {
    const deleteitem = await todoItem.findByIdAndDelete(req.params.id);
    res.status(200).json("Item Deleted");
  } catch (error) {
    res.status(500).json({ error: "Failed To Delete the Todo" });
  }
});

module.exports = router;
