import { useContext } from "react";
import { CollectionContext } from "../../context/CollectionContext";
import { Title } from "../Title";
import { CollectionTable } from "./Table";
import { NavigationButton } from "../NavigationButton";

export function Collection() {
    const { collection } = useContext(CollectionContext);

    return (
        <div>
            {collection ? (
                <>
                    <div>
                        <NavigationButton to={"/"} title="All Collections" />

                        <Title
                            title={collection.name}
                            description={collection.description}
                        />

                        <CollectionTable collection={collection} />
                    </div>
                </>
            ) : (
                "loading..."
            )}
        </div>
    );
}
