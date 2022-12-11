const express = require("express");
const app = express();
const port = 8080;

app.get("/", async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200);
  res.send("<h1>Hello world</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});