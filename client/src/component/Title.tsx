import { Box, SxProps, Typography } from "@mui/material";

type TitleProps = {
    title: string;
    description: string;
    sx?: SxProps;
};

export const Title = ({ title, description, sx }: TitleProps) => {
    return (
        <Box sx={{ marginBottom: "20px", ...sx }}>
            <Typography variant="h5" sx={{ paddingBottom: "5px" }}>
                {title}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {description}
            </Typography>
        </Box>
    );
};
