const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const collectionFolderPath = path.join(__dirname, "storage", "collectionList");

// Method to read an collection from a file
function get(collectionId) {
    try {
        const filePath = path.join(
            collectionFolderPath,
            `${collectionId}.json`
        );
        const fileData = fs.readFileSync(filePath, "utf8");
        return JSON.parse(fileData);
    } catch (error) {
        if (error.code === "ENOENT") return null;
        throw { code: "failedToReadCollection", message: error.message };
    }
}

// Method to write an collection to a file
function create(collection) {
    try {
        collection.id = crypto.randomBytes(16).toString("hex");
        const filePath = path.join(
            collectionFolderPath,
            `${collection.id}.json`
        );
        const fileData = JSON.stringify(collection);
        fs.writeFileSync(filePath, fileData, "utf8");
        return { ...collection };
    } catch (error) {
        throw { code: "failedToCreateCollection", message: error.message };
    }
}

// Method to update collection in a file
function update(collection) {
    try {
        const currentCollection = get(collection.id);
        if (!currentCollection) return null;
        const newCollection = { ...currentCollection, ...collection };
        const filePath = path.join(
            collectionFolderPath,
            `${collection.id}.json`
        );
        const fileData = JSON.stringify(newCollection);
        fs.writeFileSync(filePath, fileData, "utf8");
        return newCollection;
    } catch (error) {
        throw { code: "failedToUpdateCollection", message: error.message };
    }
}

// Method to remove an collection from a file
function remove(collectionId) {
    try {
        const filePath = path.join(
            collectionFolderPath,
            `${collectionId}.json`
        );
        fs.unlinkSync(filePath);
        return {};
    } catch (error) {
        if (error.code === "ENOENT") return {};
        throw { code: "failedToRemoveCollection", message: error.message };
    }
}

// Method to list collections in a folder
function list(ownerId) {
    try {
        const files = fs.readdirSync(collectionFolderPath);
        const collectionList = files.map((file) => {
            const fileData = fs.readFileSync(
                path.join(collectionFolderPath, file),
                "utf8"
            );
            return JSON.parse(fileData);
        });

        const filteredCollectionList = collectionList.filter(
            (collection) => collection.ownerId === ownerId
        );

        filteredCollectionList.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
        );

        return filteredCollectionList.filter(
            (collection) => collection.ownerId === ownerId
        );
    } catch (error) {
        throw { code: "failedToListCollections", message: error.message };
    }
}

module.exports = {
    get,
    create,
    update,
    remove,
    list,
};
