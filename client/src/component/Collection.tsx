import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionContext } from "../context/CollectionContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Title } from "./Title";
import { Card } from "./Card";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { CollectionListContext } from "../context/CollectionListContext";
import { CollectionDialog } from "./CollectionList/Dialog";
import { useSwitch } from "../hooks/useSwitch";

export function Collection() {
    const { handlerMap } = useContext(CollectionListContext);
    const { collection } = useContext(CollectionContext);
    const navigate = useNavigate();
    const [openForm, onOpenForm, onCloseForm] = useSwitch();

    const openDetailPage = (id: string) => {
        navigate("/artwork?id=" + id);
    };

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
                                    <IconButton
                                        size="large"
                                        onClick={onOpenForm}
                                    >
                                        <EditNoteIcon fontSize="medium" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                    title={
                                        artworksCount === 0
                                            ? "Delete collection"
                                            : "Collection is not empty. Delete artworks first."
                                    }
                                >
                                    <IconButton
                                        size="large"
                                        disabled={artworksCount > 0}
                                        onClick={handleRemove}
                                    >
                                        <DeleteIcon fontSize="medium" />
                                    </IconButton>
                                </Tooltip>

                                <CollectionDialog
                                    open={openForm}
                                    onClose={onCloseForm}
                                    onSubmit={handlerMap.handleUpdate}
                                    collection={collection}
                                />
                            </Box>
                        </Stack>

                        <Card title={`${artworksCount} artworks`} />

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
