const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const artworkDao = require("../../dao/artwork-dao.js");

const schema = {
    type: "object",
    properties: {
        collectionId: { type: "string", minLength: 32, maxLength: 32 },
    },
    required: [],
    additionalProperties: false,
};

async function ListAbl(req, res) {
    try {
        // get request query or body
        const reqParams = req.query?.collectionId ? req.query : req.body;

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

        const artworkList = artworkDao.list(reqParams.collectionId);

        res.json(artworkList);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = ListAbl;
