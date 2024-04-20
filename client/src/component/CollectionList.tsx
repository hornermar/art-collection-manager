import { useContext } from "react";
import { CollectionListContext } from "../context/CollectionListContext";
import { useNavigate } from "react-router-dom";

export function CollectionList() {
    const { collectionList, handlerMap } = useContext(CollectionListContext);
    const navigate = useNavigate();

    return (
        <div>
            {collectionList.map((collection: any) => {
                const artworksCount = Object.keys(collection.artworkMap).length;

                return (
                    <div>
                        <h2>
                            {collection.name} ({artworksCount})
                        </h2>

                        <button
                            onClick={() =>
                                navigate("/collection?id=" + collection.id)
                            }
                        >
                            Detail
                        </button>
                        {
                            <button
                                disabled={artworksCount !== 0}
                                onClick={() =>
                                    handlerMap.handleRemove({
                                        id: collection.id,
                                    })
                                }
                            >
                                Delete
                            </button>
                        }
                    </div>
                );
            })}
            <br />
            <button disabled>Add new collection</button>
        </div>
    );
}
