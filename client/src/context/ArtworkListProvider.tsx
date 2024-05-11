import React, { useContext, useEffect, useState } from "react";
import { ArtworkListContext } from "./ArtworkListContext";
import { CollectionContext } from "./CollectionContext";
import { ArtworkType } from "./ArtworkContext";

type LoadObject = {
    state: "ready" | "pending" | "error";
    error?: any;
    data?: any;
};
type ArtworkListProviderProps = {
    children: React.ReactNode;
};

export function ArtworkListProvider({ children }: ArtworkListProviderProps) {
    const [artworkLoadObject, setArtworkLoadObject] = useState<LoadObject>({
        state: "ready",
        error: null,
        data: null,
    });

    const { collection } = useContext(CollectionContext);

    useEffect(() => {
        handleLoad();
    }, [collection]);

    async function handleLoad() {
        setArtworkLoadObject((current) => ({
            ...current,
            state: "pending",
        }));
        const response = await fetch(
            `http://localhost:8000/artwork/list?collectionId=${
                collection?.id || ""
            }`,
            {
                method: "GET",
            }
        );
        const responseJson = await response.json();

        if (response.status < 400) {
            let artworkList: ArtworkType[] = Object.values(responseJson);

            artworkList.sort(
                (a: ArtworkType, b: ArtworkType) =>
                    a.inventoryNumber - b.inventoryNumber
            );

            setArtworkLoadObject({ state: "ready", data: artworkList });
            return artworkList;
        } else {
            setArtworkLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson.error,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    async function handleCreate(dtoIn: any) {
        setArtworkLoadObject((current) => ({
            ...current,
            state: "pending",
        }));
        const response = await fetch(`http://localhost:8000/artwork/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dtoIn),
        });
        const responseJson = await response.json();

        if (response.status < 400) {
            handleLoad();
            return responseJson;
        } else {
            setArtworkLoadObject((current) => {
                return {
                    state: "error",
                    data: current.data,
                    error: responseJson,
                };
            });
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    async function handleUpdate(dtoIn: any) {
        setArtworkLoadObject((current) => ({
            ...current,
            state: "pending",
        }));
        const response = await fetch(`http://localhost:8000/artwork/update`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dtoIn),
        });
        const responseJson = await response.json();

        if (response.status < 400) {
            setArtworkLoadObject((current) => {
                return { state: "ready", data: current.data };
            });
            return responseJson;
        } else {
            setArtworkLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    async function handleRemove(dtoIn: any) {
        setArtworkLoadObject((current) => ({
            ...current,
            state: "pending",
        }));
        const response = await fetch(`http://localhost:8000/artwork/delete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dtoIn),
        });
        const responseJson = await response.json();

        if (response.status < 400) {
            handleLoad();
            return responseJson;
        } else {
            setArtworkLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    const value = {
        state: artworkLoadObject.state,
        artworkList: artworkLoadObject.data || [],
        handlerMap: {
            handleCreate,
            handleUpdate,
            handleRemove,
        },
    };

    return (
        <ArtworkListContext.Provider value={value}>
            {children}
        </ArtworkListContext.Provider>
    );
}
