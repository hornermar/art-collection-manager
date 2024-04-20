import { createContext } from "react";

type Artwork = {
    id: string;
    name: string;
    author: string;
};

export const ArtworkContext = createContext({
    artwork: null as Artwork | null,
});
