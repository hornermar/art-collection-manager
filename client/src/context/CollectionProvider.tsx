import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CollectionContext } from "./CollectionContext";

type LoadObject = {
    state: "ready" | "pending" | "error";
    error?: any;
    data?: any;
};

type CollectionProviderProps = {
    children: React.ReactNode;
};

function CollectionProvider({ children }: CollectionProviderProps) {
    const [collectionLoadObject, setCollectionLoadObject] =
        useState<LoadObject>({
            state: "ready",
            error: null,
            data: null,
        });
    const location = useLocation();

    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        setCollectionLoadObject((current) => ({
            ...current,
            state: "pending",
        }));
        const response = await fetch(
            `http://localhost:8000/collection/get?id=${new URLSearchParams(
                location.search
            ).get("id")}`,
            {
                method: "GET",
            }
        );
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
    const value = {
        collection: collectionLoadObject.data,
    };

    return (
        <CollectionContext.Provider value={value}>
            {children}
        </CollectionContext.Provider>
    );
}

export default CollectionProvider;
