import { createContext } from "react";

type Collection = {
    id: string;
    name: string;
    desc: string;
    artworkList: any[];
};

export const CollectionContext = createContext({
    collection: null as Collection | null,
});
