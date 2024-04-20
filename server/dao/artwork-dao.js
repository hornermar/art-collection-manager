const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const artworkFolderPath = path.join(__dirname, "storage", "artworkList");

// Method to read an artwork from a file
function get(artworkId) {
    try {
        const filePath = path.join(artworkFolderPath, `${artworkId}.json`);
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw { code: "failedToReadArtwork", message: error.message };
    }
}

// Method to write an artwork to a file
function create(artwork) {
    try {
        artwork.id = crypto.randomBytes(16).toString("hex");
        const filePath = path.join(artworkFolderPath, `${artwork.id}.json`);
        const fileData = JSON.stringify(artwork);
        fs.writeFileSync(filePath, fileData, "utf8");
        return artwork;
    } catch (error) {
        throw { code: "failedToCreateArtwork", message: error.message };
    }
}

// Method to update artwork in a file
function update(artwork) {
    try {
        const currentArtwork = get(artwork.id);
        if (!currentArtwork) return null;
        const newArtwork = { ...currentArtwork, ...artwork };
        const filePath = path.join(artworkFolderPath, `${artwork.id}.json`);
        const fileData = JSON.stringify(newArtwork);
        fs.writeFileSync(filePath, fileData, "utf8");
        return newArtwork;
    } catch (error) {
        throw { code: "failedToUpdateArtwork", message: error.message };
    }
}

// Method to remove an artwork from a file
function remove(artworkId) {
    try {
        const filePath = path.join(artworkFolderPath, `${artworkId}.json`);
        fs.unlinkSync(filePath);
        return {};
    } catch (error) {
        if (error.code === "ENOENT") return {};
        throw { code: "failedToRemoveArtwork", message: error.message };
    }
}

// Method to list artworks in a folder
function list() {
    try {
        const files = fs.readdirSync(artworkFolderPath);
        const artworkList = files.map((file) => {
            const fileData = fs.readFileSync(
                path.join(artworkFolderPath, file),
                "utf8"
            );
            return JSON.parse(fileData);
        });
        artworkList.sort((a, b) => new Date(a.date) - new Date(b.date));
        return artworkList;
    } catch (error) {
        throw { code: "failedToListArtworks", message: error.message };
    }
}

function collectionMap() {
    const artworkList = list();

    const artworkMap = {};
    artworkList.forEach((artwork) => {
        if (!artworkMap[artwork.collectionId])
            artworkMap[artwork.collectionId] = {};

        const { name, author } = artwork;

        artworkMap[artwork.collectionId][artwork.id] = {
            name,
            author,
        };
    });
    return artworkMap;
}

module.exports = {
    get,
    create,
    update,
    remove,
    list,
    collectionMap,
};
