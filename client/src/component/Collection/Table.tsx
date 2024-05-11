import { Box, Button } from "@mui/material";
import { CollectionType } from "../../context/CollectionContext";
import { DataGrid } from "@mui/x-data-grid";
import { useColumns } from "./Columns";
import { useNavigate } from "react-router-dom";
import { ArtworkListContext } from "../../context/ArtworkListContext";
import { useContext } from "react";

type CollectionTableProps = {
    collection: CollectionType;
};

export const CollectionTable = ({ collection }: CollectionTableProps) => {
    const { handlerMap, artworkList } = useContext(ArtworkListContext);
    const navigate = useNavigate();

    const columns = useColumns();

    const createArtwork = () => {
        handlerMap.handleCreate({
            collectionId: collection.id,
        });
    };

    return (
        <Box sx={{ height: 600, width: "100%" }}>
            <Box sx={{ marginBottom: "20px" }}>
                <Button variant="contained" onClick={() => createArtwork()}>
                    Add new artwork
                </Button>
            </Box>
            <DataGrid
                rows={artworkList}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    );
};
