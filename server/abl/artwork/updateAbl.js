const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const artworkDao = require("../../dao/artwork-dao.js");

const schema = {
    type: "object",
    properties: {
        id: { type: "string", minLength: 32, maxLength: 32 },
        inventoryNumber: { type: "number" },
        incrementalNumber: { type: "string" },
        author: { type: "string" },
        title: { type: "string", minLength: 3 },
        date: { type: "string" },
        medium: { type: "string" },
        dimensions: { type: "string" },
        description: { type: "string" },
        acquisitionDate: { type: "string" },
        acquisitionType: { type: "string" },
        location: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};

// updateArtwork
async function UpdateAbl(req, res) {
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

        const updatedArtwork = artworkDao.update(artwork);
        if (!updatedArtwork) {
            res.status(404).json({
                code: "artworkNotFound",
                message: `Artwork ${artwork.id} not found`,
            });
            return;
        }

        res.json(updatedArtwork);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = UpdateAbl;
