import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import { TextFieldForm } from "../TextFieldForm";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Collection } from "../../context/CollectionContext";

type Values = {
    name: string;
    description: string;
    ownerId: string | null;
    id: string | null;
};

type CollectionListFormProps = {
    onClose: () => void;
    onSubmit: (values: Values) => void;
    collection?: Collection;
};

export const CollectionListForm = ({
    onClose,
    onSubmit,
    collection,
}: CollectionListFormProps) => {
    const { loggedInUser } = useContext(UserContext);

    const handleSubmit = (values: Values) => {
        onSubmit(values);
        onClose();
    };
    return (
        <>
            <Formik
                initialValues={{
                    name: collection?.name || "",
                    description: collection?.description || "",
                    ownerId: collection?.id ? loggedInUser?.id : "",
                    id: collection?.id || "",
                }}
                onSubmit={(values: Values) => {
                    handleSubmit(values);
                }}
            >
                <Form>
                    <TextFieldForm name="name" label="Name" type="text" />
                    <TextFieldForm
                        name="description"
                        label="Dame"
                        type="text"
                        multiline
                        rows={4}
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
