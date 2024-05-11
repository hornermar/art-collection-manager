import { createContext } from "react";

export type Collection = {
    id: string;
    name: string;
    description: string;
    artworkList: any[];
};

export const CollectionContext = createContext({
    collection: null as Collection | null,
});
