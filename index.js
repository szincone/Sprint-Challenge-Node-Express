const express = require("express");
const server = express();
// databases
const actionDB = require("./data/helpers/actionModel.js");
const projectDB = require("./data/helpers/projectModel.js");

server.use(express.json());

//////////////================================= START PROJECTSDB REQUESTS =================================//////////////
// === GET REQUEST === //
server.get("/projects", (req, res) => {
  projectDB
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

server.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  projectDB
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
server.get("/projects/:id/actions", (req, res) => {
  const { id } = req.params;
  projectDB
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
server.post("/projects", async (req, res) => {
  const project = req.body;
  if (!project.name) {
    return res.status(400).json({
      errorMessage: "Please provide a name for the project.",
    });
  } else {
    try {
      const response = await projectDB.insert(project);
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
server.delete("/projects/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await projectDB.remove(id);
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
server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = req.body;
  if (!project.name) {
    return res.status(400).json({
      errorMessage: "Please provide a name for the project.",
    });
  } else {
    projectDB
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
//////////////================================= END PROJECTSDB REQUESTS =================================//////////////

//////////////================================= START ACTIONDB REQUESTS =================================//////////////
// === GET REQUEST === //
server.get("/actions", (req, res) => {
  actionDB
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

server.get("/actions/:id", (req, res) => {
  const { id } = req.params;
  actionDB
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
server.post("/actions", async (req, res) => {
  const action = req.body;
  if (!action.project_id) {
    return res.status(400).json({
      errorMessage: "ID of existing user must be provided.",
    });
  } else {
    try {
      const response = await actionDB.insert(action);
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
server.delete("/actions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await actionDB.remove(id);
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
server.put("/actions/:id", (req, res) => {
  const { id } = req.params;
  const action = req.body;
  if (!action.project_id) {
    return res.status(400).json({
      errorMessage: "ID of existing user must be provided.",
    });
  } else {
    actionDB
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
//////////////================================= END ACTIONDB REQUESTS =================================//////////////

server.listen(7000, () => console.log("\n== API on port 7k ==\n"));
