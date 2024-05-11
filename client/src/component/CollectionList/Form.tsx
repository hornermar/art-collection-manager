import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import { TextFieldForm } from "../TextFieldForm";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { CollectionType } from "../../context/CollectionContext";

type CollectionListFormProps = {
    onClose: () => void;
    onSubmit: (values: CollectionType) => void;
    collection?: CollectionType;
};

export const CollectionListForm = ({
    onClose,
    onSubmit,
    collection,
}: CollectionListFormProps) => {
    const { loggedInUser } = useContext(UserContext);

    const handleSubmit = (values: CollectionType) => {
        const notEmptyValues = Object.fromEntries(
            Object.entries(values).filter(([key, value]) => value)
        );
        onSubmit(notEmptyValues as CollectionType);
        onClose();
    };

    return (
        <>
            <Formik
                initialValues={{
                    name: collection?.name || "",
                    description: collection?.description || "",
                    ownerId: loggedInUser.id,
                    id: collection?.id || undefined,
                }}
                onSubmit={(values: CollectionType) => {
                    handleSubmit(values);
                }}
            >
                <Form>
                    <TextFieldForm
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                    />
                    <TextFieldForm
                        name="description"
                        label="Dame"
                        type="text"
                        multiline
                        rows={4}
                        fullWidth
                    />

                    <Button variant="contained" type="submit">
                        {collection?.id ? "Update" : "Create"}
                    </Button>

                    <Button onClick={onClose}>Close</Button>
                </Form>
            </Formik>
        </>
    );
};
