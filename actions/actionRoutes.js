const express = require("express");
const router = express.Router();

const actionModel = require("./actionModel.js");

// === GET REQUEST === //
router.get("/", (req, res) => {
  actionModel
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The actions information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  actionModel
    .get(id)
    .then(action => {
      if (action.length === 0) {
        res.status(404).json({
          message: "The action with the specified ID does not exist.",
        });
      } else {
        return res.status(200).json({ action });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The action information could not be retrieved." });
    });
});

// === end GETS === //

// === POST REQUEST === //
router.post("/", async (req, res) => {
  const action = req.body;
  if (!action.project_id) {
    return res.status(400).json({
      errorMessage: "ID of existing user must be provided.",
    });
  } else {
    try {
      const response = await actionModel.insert(action);
      res.status(201).json({ message: "New action created successfully." });
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the action to the database.",
      });
    }
  }
});
// === end POST === //

// === DELETE REQUEST === //
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await actionModel.remove(id);
    if (response === 0) {
      return res.status(404).json({
        message: "The action with the specified ID does not exist.",
      });
    } else {
      return res.status(200).json({ message: "Action deleted successfully." });
    }
  } catch (err) {
    return res.status(500).json({
      error: "The action could not be removed.",
    });
  }
});
// === end DELETE === //

// === PUT REQUEST === //
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const action = req.body;
  if (!action.project_id) {
    return res.status(400).json({
      errorMessage: "ID of existing user must be provided.",
    });
  } else {
    actionModel
      .update(id, action)
      .then(count => {
        if (count) {
          res.status(200).json({ message: "Action successfully modified." });
        } else {
          res.status(404).json({
            message: "The action with the specified ID does note exist.",
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The action information could not be modified." });
      });
  }
});
// === end PUT ===  //

module.exports = router;
