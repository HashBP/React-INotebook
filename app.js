const express = require("express");
const connectToMongo = require("./db");
const notes = require("./routes/notes");
const auth = require("./routes/auth");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
connectToMongo();

app.use("/api/auth", auth);
app.use("/api/notes", notes);

app.listen(5000, () => {
  console.log("listening on port 5000");
});
