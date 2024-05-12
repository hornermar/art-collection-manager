import React from "react";
import { Typography, Box, Stack } from "@mui/material";

type CardProps = {
    title: string;
    onClick?: () => void;
    buttons?: React.ReactNode;
};

export const Card = ({ title, onClick, buttons }: CardProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 180,
                border: "1px solid #e60000",
            }}
        >
            <Typography
                variant="h5"
                onClick={onClick ? onClick : () => {}}
                sx={{
                    width: 180,
                    height: 100,
                    paddingTop: "50px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textAlign: "center",
                    cursor: onClick ? "pointer" : "default",
                    ":hover": {
                        backgroundColor: "#e60000",
                        color: "#ffffff",
                    },
                }}
            >
                {title}
            </Typography>

            {buttons && (
                <Stack
                    flexDirection="row"
                    justifyContent="space-between"
                    sx={{
                        width: "100%",
                        borderTop: "1px solid #e60000",
                    }}
                >
                    {buttons}
                </Stack>
            )}
        </Box>
    );
};
