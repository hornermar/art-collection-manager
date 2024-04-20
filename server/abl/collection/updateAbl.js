const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const collectionDao = require("../../dao/collection-dao.js");

const schema = {
    type: "object",
    properties: {
        id: { type: "string", minLength: 32, maxLength: 32 },
        name: { type: "string", minLength: 3 },
        desc: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};

async function UpdateAbl(req, res) {
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

        const updatedCollection = collectionDao.update(collection);
        if (!updatedCollection) {
            res.status(404).json({
                code: "collectionNotFound",
                message: `Collection ${collection.id} not found`,
            });
            return;
        }

        res.json(updatedCollection);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = UpdateAbl;
