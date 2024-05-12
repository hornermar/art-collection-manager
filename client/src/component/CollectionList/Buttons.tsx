import { Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
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
        <Stack
            flexDirection="row"
            justifyContent="space-between"
            sx={{
                width: "100%",
                border: "1px solid #e60000",
            }}
        >
            <Button
                onClick={onOpenForm}
                sx={{ width: "50%", borderRight: "1px solid #e60000" }}
            >
                Edit
            </Button>

            <Tooltip
                title={
                    artworksCount === 0
                        ? ""
                        : "Collection is not empty. Delete artworks first."
                }
            >
                <Button
                    disabled={artworksCount > 0}
                    onClick={() =>
                        actions.handleRemove({
                            id: collection.id,
                        })
                    }
                    sx={{
                        width: "50%",
                    }}
                >
                    Delete
                </Button>
            </Tooltip>

            <CollectionDialog
                onClose={onCloseForm}
                open={openForm}
                collection={collection}
                onSubmit={actions.handleUpdate}
            />
        </Stack>
    );
};
