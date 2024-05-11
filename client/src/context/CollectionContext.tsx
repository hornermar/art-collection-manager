import { createContext } from "react";
import { ArtworkType } from "./ArtworkContext";

export type CollectionType = {
    id?: string;
    name: string;
    description: string;
    ownerId: string | null;
    artworkList?: ArtworkType[];
};

export const CollectionContext = createContext({
    collection: null as CollectionType | null,
});
