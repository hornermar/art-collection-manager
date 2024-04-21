const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const collectionDao = require("../../dao/collection-dao.js");
const artworkDao = require("../../dao/artwork-dao.js");

const schema = {
    type: "object",
    properties: {
        userId: { type: "string", minLength: 32, maxLength: 32 },
    },
    required: [],
    additionalProperties: false,
};

async function ListAbl(req, res) {
    try {
        // get request query or body
        const reqParams = req.query?.userId ? req.query : req.body;

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

        const collectionList = collectionDao.list(reqParams.userId);
        const artworkList = artworkDao.collectionMap();

        collectionList.forEach((collection) => {
            collection.artworkList = artworkList[collection.id] || {};
        });

        res.json(collectionList);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = ListAbl;
