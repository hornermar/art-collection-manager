import { Button, Stack } from "@mui/material";
import { Formik, Form } from "formik";
import { ArtworkType } from "../../context/ArtworkContext";
import { TextFieldForm } from "../TextFieldForm";
import { useContext } from "react";
import { ArtworkListContext } from "../../context/ArtworkListContext";

type ArtworkFormProps = {
    artwork: ArtworkType;
};

export const ArtworkForm = ({ artwork }: ArtworkFormProps) => {
    const { handlerMap } = useContext(ArtworkListContext);

    const handleSubmit = (values: ArtworkType) => {
        const notEmptyValues = Object.fromEntries(
            Object.entries(values).filter(([key, value]) => value)
        );

        handlerMap.handleUpdate(notEmptyValues);
    };

    return (
        <>
            <Formik
                initialValues={{
                    id: artwork.id,
                    inventoryNumber: artwork?.inventoryNumber,
                    incrementalNumber: artwork?.incrementalNumber,
                    author: artwork?.author || "",
                    title: artwork?.title || "",
                    date: artwork?.date || "",
                    medium: artwork?.medium || "",
                    dimensions: artwork?.dimensions || "",
                    description: artwork?.description || "",
                    acquisitionDate: artwork?.acquisitionDate || "",
                    acquisitionType: artwork?.acquisitionType || "",
                    location: artwork?.location || "",
                    collectionId: artwork?.collectionId,
                }}
                onSubmit={(values: ArtworkType) => {
                    handleSubmit(values);
                    handlerMap.handleUpdate(values);
                }}
            >
                <Form>
                    <Stack
                        flexDirection="row"
                        gap={2}
                        sx={{ marginBottom: "50px" }}
                    >
                        <TextFieldForm
                            name="inventoryNumber"
                            label="Inventory No."
                            type="number"
                            disabled
                            sx={{ width: "25%" }}
                        />
                        <TextFieldForm
                            name="incrementalNumber"
                            label="Incremental No."
                            type="text"
                            disabled
                            sx={{ width: "25%" }}
                        />
                        <TextFieldForm
                            name="collectionId"
                            label="Collection ID"
                            type="text"
                            disabled
                            sx={{ width: "50%" }}
                        />
                    </Stack>

                    <Stack flexDirection="row" gap={2}>
                        <TextFieldForm
                            name="author"
                            label="Author"
                            type="text"
                            sx={{ width: "40%" }}
                        />
                        <TextFieldForm
                            name="title"
                            label="Title"
                            type="text"
                            sx={{ width: "35%" }}
                        />
                        <TextFieldForm
                            name="date"
                            label="Date"
                            type="text"
                            sx={{ width: "25%" }}
                        />
                    </Stack>

                    <Stack flexDirection="row" gap={2}>
                        <TextFieldForm
                            name="medium"
                            label="Medium"
                            type="text"
                            sx={{ width: "50%" }}
                        />
                        <TextFieldForm
                            name="dimensions"
                            label="Dimensions"
                            type="text"
                            sx={{ width: "50%" }}
                        />
                    </Stack>
                    <TextFieldForm
                        name="description"
                        label="Description"
                        type="text"
                        multiline
                        rows={4}
                        sx={{ width: "100%" }}
                    />

                    <Stack
                        flexDirection="row"
                        gap={2}
                        sx={{ margin: "50px 0" }}
                    >
                        <TextFieldForm
                            name="acquisitionDate"
                            label="Acquisition Date"
                            type="text"
                            sx={{ width: "50%" }}
                        />
                        <TextFieldForm
                            name="acquisitionType"
                            label="Acquisition Type"
                            type="text"
                            sx={{ width: "50%" }}
                        />
                    </Stack>

                    <TextFieldForm
                        name="location"
                        label="Location"
                        type="text"
                        sx={{ width: "100%" }}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ marginTop: "20px", float: "right" }}
                    >
                        Save
                    </Button>
                </Form>
            </Formik>
        </>
    );
};
