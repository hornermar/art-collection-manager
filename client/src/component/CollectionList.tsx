import { useContext } from "react";
import { CollectionListContext } from "../context/CollectionListContext";
import { useNavigate } from "react-router-dom";
import { useSwitch } from "../hooks/useSwitch";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
    TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export function CollectionList() {
    const { collectionList, handlerMap } = useContext(CollectionListContext);
    const navigate = useNavigate();
    const [openForm, onOpenForm, onCloseForm] = useSwitch();

    return (
        <div>
            {collectionList.map((collection: any) => {
                const artworksCount = Object.keys(
                    collection.artworkList
                ).length;

                return (
                    <div>
                        <h2>
                            {collection.name} ({artworksCount})
                        </h2>

                        <button
                            onClick={() =>
                                navigate("/collection?id=" + collection.id)
                            }
                        >
                            Detail
                        </button>
                        {
                            <button
                                disabled={artworksCount !== 0}
                                onClick={() =>
                                    handlerMap.handleRemove({
                                        id: collection.id,
                                    })
                                }
                            >
                                Delete
                            </button>
                        }
                    </div>
                );
            })}
            <br />
            <Button
                variant="contained"
                onClick={() => onOpenForm()}
                startIcon={<AddIcon />}
            >
                New collection
            </Button>

            <Dialog onClose={onCloseForm} open={openForm}>
                <DialogTitle>Add new collection</DialogTitle>
                <DialogContent
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        multiline
                        maxRows={4}
                        rows={4}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseForm}>Cancel</Button>
                    <Button variant="contained" onClick={onCloseForm}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
