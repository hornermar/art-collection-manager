import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { CollectionDialog } from "./Dialog";
import { useSwitch } from "../../hooks/useSwitch";
import { CollectionType } from "../../context/CollectionContext";

type CollectionListButtonsProps = {
    collection: CollectionType;
    actions: any;
};

export const CollectionListButtons = ({
    collection,
    actions,
}: CollectionListButtonsProps) => {
    const [openForm, onOpenForm, onCloseForm] = useSwitch();
    const artworksCount = collection.artworkList
        ? Object.keys(collection.artworkList).length
        : 0;
    return (
        <Box>
            <Tooltip title="Edit collection">
                <span>
                    <IconButton size="large" onClick={onOpenForm}>
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
                        onClick={() =>
                            actions.handleRemove({
                                id: collection.id,
                            })
                        }
                    >
                        <DeleteIcon fontSize="medium" />
                    </IconButton>
                </span>
            </Tooltip>

            <CollectionDialog
                onClose={onCloseForm}
                open={openForm}
                collection={collection}
                onSubmit={actions.handleUpdate}
            />
        </Box>
    );
};
