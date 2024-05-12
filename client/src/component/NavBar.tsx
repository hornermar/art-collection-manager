import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { Dropdown } from "./Dropdown";
import { useNavigate } from "react-router-dom";

export function NavBar() {
    const navigate = useNavigate();
    const { userList, loggedInUser, handlerMap } = useContext(UserContext);

    const handleChange = (value: any) => {
        handlerMap.login(value);
        value !== loggedInUser?.id && navigate("/");
    };

    return (
        <Box>
            <AppBar
                position="static"
                color="secondary"
                sx={{ boxShadow: "none !important" }}
            >
                <Toolbar
                    sx={{
                        padding: "10px 20px",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                    }}
                >
                    <Typography
                        variant="h3"
                        component="div"
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Art Collection Manager
                    </Typography>

                    <Dropdown
                        options={userList}
                        onChange={(value) => handleChange(value)}
                        value={loggedInUser?.name}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
