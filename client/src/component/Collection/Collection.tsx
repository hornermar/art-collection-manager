import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionContext } from "../../context/CollectionContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Title } from "../Title";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { CollectionListContext } from "../../context/CollectionListContext";
import { CollectionDialog } from "../CollectionList/Dialog";
import { useSwitch } from "../../hooks/useSwitch";
import { CollectionTable } from "./Table";
import { NavigationButton } from "../NavigationButton";

export function Collection() {
    const { handlerMap } = useContext(CollectionListContext);
    const { collection } = useContext(CollectionContext);
    const navigate = useNavigate();
    const [openForm, onOpenForm, onCloseForm] = useSwitch();

    const handleRemove = () => {
        handlerMap.handleRemove({ id: collection?.id });
        // navigate("/");
    };

    const artworksCount = collection?.artworkList
        ? Object.keys(collection.artworkList).length
        : 0;

    return (
        <div>
            {collection ? (
                <>
                    <div>
                        <NavigationButton to={"/"} title="All Collections" />
                        <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                        >
                            <Title
                                title={collection.name}
                                description={collection.description}
                            />

                            <Box>
                                <Tooltip title="Edit collection">
                                    <span>
                                        <IconButton
                                            size="large"
                                            onClick={onOpenForm}
                                        >
                                            <EditNoteIcon fontSize="medium" />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Tooltip
                                    title={
                                        artworksCount === 0
                                            ? "Delete collection"
                                            : "Collection is not empty. Delete artworks first."
                                    }
                                >
                                    <span>
                                        <IconButton
                                            size="large"
                                            disabled={artworksCount > 0}
                                            onClick={handleRemove}
                                        >
                                            <DeleteIcon fontSize="medium" />
                                        </IconButton>
                                    </span>
                                </Tooltip>

                                <CollectionDialog
                                    open={openForm}
                                    onClose={onCloseForm}
                                    onSubmit={handlerMap.handleUpdate}
                                    collection={collection}
                                />
                            </Box>
                        </Stack>

                        <CollectionTable collection={collection} />
                    </div>
                </>
            ) : (
                "loading..."
            )}
        </div>
    );
}
