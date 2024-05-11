import { createContext } from "react";

export type ArtworkType = {
    id: string;
    collectionId?: string;
    inventoryNumber: number;
    incrementalNumber: string;
    author: string;
    title: string;
    date: string;
    medium: string;
    dimensions: string;
    description: string;
    acquisitionDate: string;
    acquisitionType: string;
    location: string;
};

export const ArtworkContext = createContext({
    artwork: null as ArtworkType | null,
});
