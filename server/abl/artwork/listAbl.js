const collectionDao = require("../../dao/collection-dao.js");

async function ListAbl(req, res) {
    try {
        const collectionList = collectionDao.list();

        res.json(collectionList);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = ListAbl;
