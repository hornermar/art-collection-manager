const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/artwork/getAbl");
const ListAbl = require("../abl/artwork/listAbl");
const CreateAbl = require("../abl/artwork/createAbl");
const UpdateAbl = require("../abl/artwork/updateAbl");
const DeleteAbl = require("../abl/artwork/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
