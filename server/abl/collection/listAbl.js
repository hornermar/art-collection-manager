const collectionDao = require("../../dao/collection-dao.js");
const artworkDao = require("../../dao/artwork-dao.js");

async function ListAbl(req, res) {
    try {
        const collectionList = collectionDao.list();

        const artworkMap = artworkDao.collectionMap();

        collectionList.forEach((collection) => {
            collection.artworkMap = artworkMap[collection.id] || {};
        });

        res.json(collectionList);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = ListAbl;
