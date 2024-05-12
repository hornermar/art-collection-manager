import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { CollectionListForm } from "./Form";
import { CollectionType } from "../../context/CollectionContext";
import CloseIcon from "@mui/icons-material/Close";

type CollectionDialogProps = {
    onClose: () => void;
    open: boolean;
    onSubmit: (dtoIn: any) => void;
    collection?: CollectionType;
};

export const CollectionDialog = ({
    onClose,
    open,
    onSubmit,
    collection,
}: CollectionDialogProps) => {
    return (
        <Dialog open={open}>
            <DialogTitle>Add new collection</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    ":hover": {
                        backgroundColor: "transparent",
                    },
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
                <CollectionListForm
                    onClose={onClose}
                    onSubmit={onSubmit}
                    collection={collection}
                />
            </DialogContent>
        </Dialog>
    );
};
