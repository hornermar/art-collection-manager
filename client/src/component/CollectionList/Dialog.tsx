import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { CollectionListForm } from "./Form";
import { CollectionType } from "../../context/CollectionContext";

type CollectionDialogProps = {
    onClose: () => void;
    open: boolean;
    onSubmit: (dtoIn: any) => void;
    collection?: CollectionType;
};

type Values = {
    name: string;
    description: string;
    ownerId: string;
};

export const CollectionDialog = ({
    onClose,
    open,
    onSubmit,
    collection,
}: CollectionDialogProps) => {
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Add new collection</DialogTitle>
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
