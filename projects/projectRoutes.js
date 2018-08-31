const express = require("express");
const router = express.Router();

const projectModel = require("./projectModel.js");

// === GET REQUEST === //
router.get("/", (req, res) => {
  projectModel
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The projects information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  projectModel
    .get(id)
    .then(project => {
      if (project.length === 0) {
        res.status(404).json({
          message: "The project with the specified ID does not exist.",
        });
      } else {
        return res.status(200).json({ project });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." });
    });
});

// GET USER POSTS REQUEST
router.get("/:id/actions", (req, res) => {
  const { id } = req.params;
  projectModel
    .getProjectActions(id)
    .then(actions => {
      if (actions.length === 0) {
        res.status(404).json({
          message: "The project with the specified ID does not exist.",
        });
      } else {
        return res.status(200).json({ actions });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The project information could not be retrieved." });
    });
});

// === end GETS === //

// === POST REQUEST === //
router.post("/", async (req, res) => {
  const project = req.body;
  if (!project.name) {
    return res.status(400).json({
      errorMessage: "Please provide a name for the project.",
    });
  } else {
    try {
      const response = await projectModel.insert(project);
      res.status(201).json({ message: "New project created successfully." });
    } catch (err) {
      res.status(500).json({
        error: "There was an error while saving the project to the database.",
      });
    }
  }
});
// === end POST === //

// === DELETE REQUEST === //
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await projectModel.remove(id);
    if (response === 0) {
      return res.status(404).json({
        message: "The project with the specified ID does not exist.",
      });
    } else {
      return res.status(200).json({ message: "Project deleted successfully." });
    }
  } catch (err) {
    return res.status(500).json({
      error: "The project could not be removed.",
    });
  }
});
// === end DELETE === //

// === PUT REQUEST === //
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const project = req.body;
  if (!project.name) {
    return res.status(400).json({
      errorMessage: "Please provide a name for the project.",
    });
  } else {
    projectModel
      .update(id, project)
      .then(count => {
        if (count) {
          res.status(200).json({ message: "Project successfully modified." });
        } else {
          res.status(404).json({
            message: "The project with the specified ID does note exist.",
          });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The project information could not be modified." });
      });
  }
});
// === end PUT ===  //

module.exports = router;
