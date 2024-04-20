import { createContext } from "react";

export const CollectionListContext = createContext({
    state: "",
    collectionList: [],
    handlerMap: {
        handleCreate: (dtoIn: any) => {},
        handleUpdate: (dtoIn: any) => {},
        handleRemove: (dtoIn: any) => {},
    },
});
