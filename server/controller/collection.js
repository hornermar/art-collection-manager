const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/collection/getAbl");
const ListAbl = require("../abl/collection/listAbl");
const CreateAbl = require("../abl/collection/createAbl");
const UpdateAbl = require("../abl/collection/updateAbl");
const DeleteAbl = require("../abl/collection/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
