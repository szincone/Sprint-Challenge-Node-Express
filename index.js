const express = require("express");
const server = express();
// databases
const actionDB = require("./data/helpers/actionModel.js");
const projectDB = require("./data/helpers/projectModel.js");

server.use(express.json());

//////////////================================= START PROJECTSDB REQUESTS =================================//////////////
// GET REQUEST //
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
        .json({ error: "The post information could not be retrieved." });
    });
});

// end GETS //

//////////////================================= END PROJECTSDB REQUESTS =================================//////////////

server.listen(7000, () => console.log("\n== API on port 7k ==\n"));
