const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const artworkDao = require("../../dao/artwork-dao.js");

const schema = {
    type: "object",
    properties: {
        collectionId: { type: "string", minLength: 32, maxLength: 32 },
        author: { type: "string" },
        name: { type: "string", minLength: 3 },
    },
    required: ["collectionId", "author", "name"],
    additionalProperties: false,
};

async function CreateAbl(req, res) {
    try {
        let artwork = req.body;

        // validate input
        const valid = ajv.validate(schema, artwork);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        artwork = artworkDao.create(artwork);
        res.json(artwork);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = CreateAbl;
