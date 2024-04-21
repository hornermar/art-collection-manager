const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const collectionDao = require("../../dao/collection-dao.js");
const artworkDao = require("../../dao/artwork-dao.js");

const schema = {
    type: "object",
    properties: {
        id: { type: "string", minLength: 32, maxLength: 32 },
    },
    required: ["id"],
    additionalProperties: false,
};

// loadCollection
async function GetAbl(req, res) {
    try {
        // get request query or body
        const reqParams = req.query?.id ? req.query : req.body;

        // validate input
        const valid = ajv.validate(schema, reqParams);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        // read collection by given id
        const collection = collectionDao.get(reqParams.id);
        if (!collection) {
            res.status(404).json({
                code: "collectionNotFound",
                message: `Collection ${reqParams.id} not found`,
            });
            return;
        }

        const artworkList = artworkDao.collectionMap();
        collection.artworkList = artworkList[reqParams.id] || {};

        res.json(collection);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = GetAbl;
