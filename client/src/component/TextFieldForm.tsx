import { SxProps, TextField } from "@mui/material";
import { useField } from "formik";

type TextFieldFormProps = {
    name: string;
    label: string;
    type?: string;
    multiline?: boolean;
    rows?: number;
    disabled?: boolean;
    fullWidth?: boolean;
    sx?: SxProps;
};

export const TextFieldForm = ({
    label,
    multiline,
    rows,
    fullWidth,
    sx,
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
            fullWidth={fullWidth}
            sx={{ marginBottom: 2, ...sx }}
        />
    );
};
