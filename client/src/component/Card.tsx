import React from "react";
import { Typography, Avatar, Box, Hidden } from "@mui/material";

import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

type CardProps = {
    title: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    buttons?: React.ReactNode;
};

export const Card = ({ title, onClick, icon, buttons }: CardProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 180,
            }}
        >
            <Box
                onClick={onClick ? onClick : () => {}}
                sx={{
                    cursor: onClick ? "pointer" : "default",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar
                    sx={{
                        width: 60,
                        height: 60,
                        marginBottom: "20px",
                    }}
                >
                    {icon ? icon : <ImageOutlinedIcon fontSize="large" />}
                </Avatar>
                <Typography
                    variant="h5"
                    sx={{
                        width: 150,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        textAlign: "center",
                    }}
                >
                    {title}
                </Typography>
            </Box>

            {buttons && buttons}
        </Box>
    );
};
