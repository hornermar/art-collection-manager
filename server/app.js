const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const userController = require("./controller/user");
const collectionController = require("./controller/collection");
const artworkController = require("./controller/artwork");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/user", userController);
app.use("/collection", collectionController);
app.use("/artwork", artworkController);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
