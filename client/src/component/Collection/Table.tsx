import { Box, Button } from "@mui/material";
import { CollectionType } from "../../context/CollectionContext";
import { DataGrid } from "@mui/x-data-grid";
import { useColumns } from "./Columns";
import { ArtworkListContext } from "../../context/ArtworkListContext";
import { useContext } from "react";

type CollectionTableProps = {
    collection: CollectionType;
};

export const CollectionTable = ({ collection }: CollectionTableProps) => {
    const { handlerMap, artworkList } = useContext(ArtworkListContext);

    const columns = useColumns();

    const createArtwork = () => {
        handlerMap.handleCreate({
            collectionId: collection.id,
        });
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ margin: "30px 0" }}>
                <Button variant="contained" onClick={() => createArtwork()}>
                    Add new artwork
                </Button>
            </Box>
            <DataGrid
                sx={{ minHeight: "213px" }}
                rows={artworkList}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 8,
                        },
                    },
                    sorting: {
                        sortModel: [{ field: "inventoryNumber", sort: "asc" }],
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    );
};
