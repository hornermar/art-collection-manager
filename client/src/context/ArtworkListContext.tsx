import { createContext } from "react";

export const ArtworkListContext = createContext({
    state: "",
    artworkList: [],
    handlerMap: {
        handleCreate: (dtoIn: any) => {},
        handleUpdate: (dtoIn: any) => {},
        handleRemove: (dtoIn: any) => {},
    },
});
