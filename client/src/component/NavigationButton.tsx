import { Box, IconButton, Stack, Typography } from "@mui/material";
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
            sx={{ marginBottom: "20px", alignItems: "center" }}
        >
            <IconButton
                aria-label="back"
                onClick={() => navigate(to)}
                sx={{ marginRight: "5px" }}
            >
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="subtitle1" component="span">
                {title}
            </Typography>
        </Stack>
    );
};
