const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const collectionDao = require("../../dao/collection-dao.js");

const schema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 3 },
        desc: { type: "string" },
        ownerId: {
            type: "string",
            minLength: 32,
            maxLength: 32,
        },
    },
    required: ["name", "ownerId"],
    additionalProperties: false,
};

async function CreateAbl(req, res) {
    // TODO: if ownerId is not includes in user table, return 400
    try {
        let collection = req.body;

        // validate input
        const valid = ajv.validate(schema, collection);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        collection = collectionDao.create(collection);
        res.json(collection);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = CreateAbl;
