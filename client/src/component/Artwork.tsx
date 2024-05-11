import { useContext } from "react";
import { ArtworkContext } from "../context/ArtworkContext";
import { ArtworkForm } from "./Artwork/Form";

import { NavigationButton } from "./NavigationButton";

export function Artwork() {
    const { artwork } = useContext(ArtworkContext);

    return (
        <div>
            {artwork ? (
                <>
                    <NavigationButton
                        to={"/collection?id=" + artwork.collectionId}
                        title="Collection"
                    />

                    <ArtworkForm artwork={artwork} />
                </>
            ) : (
                "loading..."
            )}
        </div>
    );
}
