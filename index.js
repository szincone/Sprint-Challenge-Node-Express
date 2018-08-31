const express = require("express");
const server = express();
// databases
const projectDB = require("./data/helpers/actionModel.js");
const actionDB = require("./data/helpers/projectModel.js");

server.use(express.json());

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

//////////////================================= END POSTDB REQUESTS =================================//////////////

server.listen(7000, () => console.log("\n== API on port 7k ==\n"));
