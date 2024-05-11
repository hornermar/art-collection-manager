import { TextField } from "@mui/material";
import { useField } from "formik";

type TextFieldFormProps = {
    name: string;
    label: string;
    type?: string;
    multiline?: boolean;
    rows?: number;
};

export const TextFieldForm = ({
    label,
    multiline,
    rows,
    ...props
}: TextFieldFormProps) => {
    const [field, meta, helpers] = useField(props);

    return (
        <TextField
            {...field}
            {...props}
            label={label}
            variant="outlined"
            multiline={multiline}
            rows={rows}
            fullWidth
            sx={{ marginBottom: 2 }}
        />
    );
};
