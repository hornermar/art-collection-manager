import React from "react";
import { Typography, Avatar, Box } from "@mui/material";

import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

type CardProps = {
    title: string;
    onClick?: () => void;
    icon?: React.ReactNode;
};

export const Card = ({ title, onClick, icon }: CardProps) => {
    return (
        <Box
            onClick={onClick ? onClick : () => {}}
            sx={{
                cursor: onClick ? "pointer" : "default",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 150,
            }}
        >
            <Avatar sx={{ width: 56, height: 56, marginBottom: "20px" }}>
                {icon ? icon : <ImageOutlinedIcon fontSize="large" />}
            </Avatar>
            <Typography variant="h5">{title}</Typography>
        </Box>
    );
};
