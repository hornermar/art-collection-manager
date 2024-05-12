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
                validate={(values) => {
                    const errors: Partial<CollectionType> = {};
                    if (values.name.length === 0) {
                        errors.name = "Name is required";
                    }

                    if (values.description.length < 3) {
                        errors.description =
                            "Description must be at least 3 characters";
                    }
                    return errors;
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
                        label="Description"
                        type="text"
                        multiline
                        rows={4}
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ float: "right" }}
                    >
                        {collection?.id ? "Update" : "Create"}
                    </Button>
                </Form>
            </Formik>
        </>
    );
};
