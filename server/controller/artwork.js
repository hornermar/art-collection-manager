const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/artwork/getAbl");

// don't need list for now
// const ListAbl = require("../abl/artwork/listAbl");
// router.get("/list", ListAbl);

const CreateAbl = require("../abl/artwork/createAbl");
const UpdateAbl = require("../abl/artwork/updateAbl");
const DeleteAbl = require("../abl/artwork/deleteAbl");

router.get("/get", GetAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
