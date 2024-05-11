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
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, cursor: "pointer" }}
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
