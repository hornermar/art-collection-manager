import { createContext } from "react";

type Collection = {
    id: string;
    name: string;
    desc: string;
    artworkMap: any[];
};

export const CollectionContext = createContext({
    collection: null as Collection | null,
});
