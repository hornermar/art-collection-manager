import { useContext } from "react";
import { ArtworkContext } from "../context/ArtworkContext";

export function Artwork() {
    const { artwork } = useContext(ArtworkContext);

    return (
        <div>
            {artwork ? (
                <>
                    <div>
                        <h3>{artwork.name}</h3>
                        <p>{artwork.author}</p>
                    </div>
                </>
            ) : (
                "loading..."
            )}
        </div>
    );
}
