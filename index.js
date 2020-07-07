const express = require("express");
const server = express();
const shortid = require("shortid");
const cors = require("cors");
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.send("<h1>NodeProject1</h1>");
});

let users = [
  {
    name: "Nathaniel Richards",
    bio: "This is a simple bio",
    id: shortid.generate(),
  },
  {
    name: "Nicholas Galluci",
    bio: "Web31 TL",
    id: shortid.generate(),
  },
];
server.post("/api/users", (req, res) => {
  if (req.body.name === undefined || req.body.bio === undefined) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide a name and bio for the user." });
  }

  const newUser = req.body;
  newUser.id = shortid.generate();
  users.push(newUser);

  res.status(201).json(newUser);
});

server.get("/api/users", (req, res) => {
  res.json(users);
});

server.get("/api/users/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    return res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
  res.json(user);
});

server.delete("/api/users/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    return res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
  const newUsers = users.filter((user_ref) => {
    return user_ref.id !== user.id;
  });
  users = newUsers;
  res.json(user);
});

server.put("/api/users/:id", (req, res) => {
  if (req.body.name === undefined || req.body.bio === undefined) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide a name and bio for the user." });
  }
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    return res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
  const newUsers = users.filter((user_ref) => {
    return user_ref.id !== user.id;
  });
  const newUser = req.body;
  newUser.id = req.params.id;
  newUsers.push(newUser);
  users = newUsers;
  res.status(200).json(newUser);
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server On Port ${PORT}`);
});
