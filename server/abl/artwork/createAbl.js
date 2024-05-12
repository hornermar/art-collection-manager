const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const artworkDao = require("../../dao/artwork-dao.js");

const schema = {
    type: "object",
    properties: {
        collectionId: { type: "string", minLength: 32, maxLength: 32 },
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
    required: ["collectionId"],
    additionalProperties: false,
};

// createArtwork
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

        const artworkList = artworkDao.list(artwork.collectionId);

        const inventoryNumbers = artworkList
            .map((artwork) => artwork.inventoryNumber)
            .filter(Number);
        const inventoryNumber =
            inventoryNumbers.length > 0 ? Math.max(...inventoryNumbers) + 1 : 1;

        const incrementalNumbers = artworkList.map(
            (artwork) => artwork.incrementalNumber
        );

        const currentYear = new Date().getFullYear();
        const currentYearNumbers = incrementalNumbers
            .filter((num) => num.endsWith(`/${currentYear}`))
            .map((num) => +num.split("/")[0]);

        const maxNumber = Math.max(...currentYearNumbers, 0);

        const incrementalNumber = `${maxNumber + 1}/${currentYear}`;

        artwork = artworkDao.create({
            ...artwork,
            inventoryNumber,
            incrementalNumber,
        });

        res.json(artwork);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = CreateAbl;
