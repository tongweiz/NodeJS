let express = require("express");
let app = express();
let port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
