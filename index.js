const express = require("express");
const server = express();

server.get("/", (req, res) => {
  res.send("<h1>NodeProject1</h1>");
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server On Port ${PORT}`);
});
