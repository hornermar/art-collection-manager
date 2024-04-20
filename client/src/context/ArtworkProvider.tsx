import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArtworkContext } from "./ArtworkContext";

type LoadObject = {
    state: "ready" | "pending" | "error";
    error?: any;
    data?: any;
};

type ArtworkProviderProps = {
    children: React.ReactNode;
};

function ArtworkProvider({ children }: ArtworkProviderProps) {
    const [artworkLoadObject, setArtworkLoadObject] = useState<LoadObject>({
        state: "ready",
        error: null,
        data: null,
    });
    const location = useLocation();

    useEffect(() => {
        handleLoad();
    }, []);

    async function handleLoad() {
        setArtworkLoadObject((current) => ({
            ...current,
            state: "pending",
        }));
        const response = await fetch(
            `http://localhost:8000/artwork/get?id=${new URLSearchParams(
                location.search
            ).get("id")}`,
            {
                method: "GET",
            }
        );
        const responseJson = await response.json();
        if (response.status < 400) {
            setArtworkLoadObject({ state: "ready", data: responseJson });
            return responseJson;
        } else {
            setArtworkLoadObject((current) => ({
                state: "error",
                data: current.data,
                error: responseJson.error,
            }));
            throw new Error(JSON.stringify(responseJson, null, 2));
        }
    }
    const value = {
        artwork: artworkLoadObject.data,
    };

    return (
        <ArtworkContext.Provider value={value}>
            {children}
        </ArtworkContext.Provider>
    );
}

export default ArtworkProvider;
