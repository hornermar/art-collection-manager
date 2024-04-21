import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionContext } from "../context/CollectionContext";

export function Collection() {
    const navigate = useNavigate();
    const { collection } = useContext(CollectionContext);

    const openDetailPage = (id: string) => {
        navigate("/artwork?id=" + id);
    };

    return (
        <div>
            {collection ? (
                <>
                    <div>
                        <h3>{collection.name}</h3>
                        <p>{collection.desc}</p>
                        <p>{collection.id}</p>

                        <hr />

                        <div>
                            {collection?.artworkList &&
                                Object.entries(collection.artworkList).map(
                                    ([key, value]) => {
                                        return (
                                            <div
                                                style={{
                                                    border: "1px dotted red",
                                                }}
                                            >
                                                <p>{value.name}</p>
                                                <p>{value.author}</p>
                                                <button
                                                    onClick={() =>
                                                        openDetailPage(key)
                                                    }
                                                >
                                                    Detail
                                                </button>
                                            </div>
                                        );
                                    }
                                )}
                        </div>
                    </div>
                </>
            ) : (
                "loading..."
            )}
        </div>
    );
}
