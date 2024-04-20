import { useContext } from "react";
import { CollectionListContext } from "../context/CollectionListContext";
import { useNavigate } from "react-router-dom";

export function CollectionList() {
    const { collectionList } = useContext(CollectionListContext);
    const navigate = useNavigate();

    return (
        <div>
            {collectionList.map((collection: any) => {
                return (
                    <div>
                        <h2>{collection.name}</h2>

                        <button
                            onClick={() =>
                                navigate("/collection?id=" + collection.id)
                            }
                        >
                            Detail
                        </button>
                    </div>
                );
            })}
            <br />
            <button disabled>Add new collection</button>
        </div>
    );
}
