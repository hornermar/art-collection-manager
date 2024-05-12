import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type NavigationButtonProps = {
    to: string;
    title: string;
};

export const NavigationButton = ({ to, title }: NavigationButtonProps) => {
    const navigate = useNavigate();
    return (
        <Stack
            flexDirection="row"
            sx={{
                marginBottom: "20px",
                alignItems: "center",
                cursor: "pointer",
            }}
            onClick={() => navigate(to)}
        >
            <ArrowBackIcon sx={{ marginRight: "5px" }} />

            <Typography
                variant="subtitle1"
                component="span"
                sx={{ textDecoration: "underline" }}
            >
                {title}
            </Typography>
        </Stack>
    );
};
