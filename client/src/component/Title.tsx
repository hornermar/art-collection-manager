import { Box, SxProps, Typography } from "@mui/material";

type TitleProps = {
    title: string;
    description: string;
    sx?: SxProps;
};

export const Title = ({ title, description, sx }: TitleProps) => {
    return (
        <Box sx={{ marginBottom: "50px", ...sx }}>
            <Typography variant="h3" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h5" gutterBottom>
                {description}
            </Typography>
        </Box>
    );
};
