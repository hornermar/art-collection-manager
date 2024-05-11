import React, { useContext } from "react";
import { CollectionListContext } from "../../context/CollectionListContext";
import { useNavigate } from "react-router-dom";
import { useSwitch } from "../../hooks/useSwitch";
import { Dialog, DialogTitle, DialogContent, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Card } from "../Card";
import { CollectionListForm } from "./Form";
import { Title } from "../Title";
import { CollectionDialog } from "./Dialog";

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

            <Stack flexDirection="row" gap={3} sx={{ marginTop: "80px" }}>
                {collectionList.map((collection: any) => {
                    const artworksCount = collection.artworkList
                        ? Object.keys(collection.artworkList).length
                        : 0;

                    return (
                        <Card
                            onClick={() =>
                                navigate("/collection?id=" + collection.id)
                            }
                            title={`${collection.name} (${artworksCount})`}
                            key={collection.id}
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
