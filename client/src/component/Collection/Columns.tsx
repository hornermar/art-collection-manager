import React, { useContext } from "react";
import {
    GridActionsCellItem,
    GridRowParams,
    GridColDef,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { ArtworkListContext } from "../../context/ArtworkListContext";

export const useColumns = () => {
    const { handlerMap } = useContext(ArtworkListContext);
    const navigate = useNavigate();

    const deleteArtwork = (id: string) => () => {
        handlerMap.handleRemove({ id });
    };

    const editArtwork = (id: string) => () => {
        navigate("/artwork?id=" + id);
    };

    return React.useMemo(() => {
        return [
            {
                field: "inventoryNumber",
                headerName: "Inventory No.",
                type: "number",
                width: 150,
            },
            {
                field: "incrementalNumber",
                headerName: "Incremental No.",
                width: 150,
            },
            {
                field: "title",
                headerName: "Title",
                width: 150,
            },
            {
                field: "author",
                headerName: "Author",
                width: 150,
            },
            {
                field: "date",
                headerName: "Date",
                width: 110,
            },
            {
                field: "actions",
                type: "actions",
                width: 80,
                getActions: (params: GridRowParams) => [
                    <GridActionsCellItem
                        icon={<EditNoteIcon />}
                        label="Edit"
                        onClick={editArtwork(params.row.id)}
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={deleteArtwork(params.row.id)}
                    />,
                ],
            },
        ] as GridColDef[];
    }, []);
};
