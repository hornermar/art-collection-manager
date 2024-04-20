import React, { useEffect, useState } from "react";
import { CollectionListContext } from "./CollectionListContext";

type LoadObject = {
    state: "ready" | "pending" | "error";
    error?: any;
    data?: any;
};
type CollectionListProviderProps = {
    children: React.ReactNode;
};

export function CollectionListProvider({
    children,
}: CollectionListProviderProps) {
    const [collectionLoadObject, setCollectionLoadObject] =
        useState<LoadObject>({
            state: "ready",
            error: null,
            data: null,
        });

    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        setCollectionLoadObject((current) => ({
            ...current,
            state: "pending",
        }));
        const response = await fetch(`http://localhost:8000/collection/list`, {
            method: "GET",
        });
        const responseJson = await response.json();
        if (response.status < 400) {
            setCollectionLoadObject({ state: "ready", data: responseJson });
            return responseJson;
        } else {
            setCollectionLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson.error,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    async function handleCreate(dtoIn: any) {
        setCollectionLoadObject((current) => ({
            ...current,
            state: "pending",
        }));
        const response = await fetch(
            `http://localhost:8000/collection/create`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dtoIn),
            }
        );
        const responseJson = await response.json();

        if (response.status < 400) {
            setCollectionLoadObject((current) => {
                current.data.push(responseJson);
                current.data.sort(
                    (a: any, b: any) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                );
                return { state: "ready", data: current.data };
            });
            return responseJson;
        } else {
            setCollectionLoadObject((current) => {
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
        setCollectionLoadObject((current) => ({
            ...current,
            state: "pending",
        }));
        const response = await fetch(
            `http://localhost:8000/collection/update`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dtoIn),
            }
        );
        const responseJson = await response.json();

        if (response.status < 400) {
            setCollectionLoadObject((current) => {
                const collectionIndex = current.data.findIndex(
                    (e: any) => e.id === responseJson.id
                );
                current.data[collectionIndex] = responseJson;
                current.data.sort(
                    (a: any, b: any) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                );
                return { state: "ready", data: current.data };
            });
            return responseJson;
        } else {
            setCollectionLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    async function handleArtwork(dtoIn: any) {
        setCollectionLoadObject((current) => ({
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
            await handleLoad();
        } else {
            setCollectionLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }

    const value = {
        state: collectionLoadObject.state,
        collectionList: collectionLoadObject.data || [],
        handlerMap: { handleCreate, handleUpdate, handleArtwork },
    };

    return (
        <CollectionListContext.Provider value={value}>
            {children}
        </CollectionListContext.Provider>
    );
}
