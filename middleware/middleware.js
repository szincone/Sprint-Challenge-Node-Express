const express = require("express");

const projectRoutes = require("../projects/projectRoutes.js");
const actionRoutes = require("../actions/actionRoutes.js");

module.exports = server => {
  server.use(express.json());
  server.use("/projects", projectRoutes);
  server.use("/actions", actionRoutes);
};
