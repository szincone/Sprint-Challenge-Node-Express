const express = require("express");
const server = express();

const configureMiddleware = require("./middleware/middleware.js");
configureMiddleware(server);

server.listen(7000, () => console.log("\n== API on port 7k ==\n"));
