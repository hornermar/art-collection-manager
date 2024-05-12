import React, { useContext } from "react";
import { CollectionListContext } from "../../context/CollectionListContext";
import { useNavigate } from "react-router-dom";
import { useSwitch } from "../../hooks/useSwitch";
import AddIcon from "@mui/icons-material/Add";
import { Card } from "../Card";
import { Title } from "../Title";
import { CollectionDialog } from "./Dialog";
import { Stack } from "@mui/material";
import { CollectionListButtons } from "./Buttons";

export function CollectionList() {
    const { collectionList, handlerMap } = useContext(CollectionListContext);
    const navigate = useNavigate();
    const [openForm, onOpenForm, onCloseForm] = useSwitch();

    return (
        <div>
            <Title
                title="Collections"
                description="Choose the collection you want to manage"
            />

            <Stack
                flexDirection="row"
                gap={4}
                sx={{ marginTop: "80px" }}
                flexWrap="wrap"
            >
                {collectionList.map((collection: any) => {
                    return (
                        <Card
                            onClick={() =>
                                navigate("/collection?id=" + collection.id)
                            }
                            title={`${collection.name}`}
                            key={collection.id}
                            buttons={
                                <CollectionListButtons
                                    actions={handlerMap}
                                    collection={collection}
                                />
                            }
                        />
                    );
                })}

                <Card
                    title="Add collection"
                    onClick={onOpenForm}
                    icon={<AddIcon fontSize="large" />}
                />
            </Stack>

            <CollectionDialog
                onClose={onCloseForm}
                open={openForm}
                onSubmit={handlerMap.handleCreate}
            />
        </div>
    );
}
