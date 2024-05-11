import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CollectionList } from "./CollectionList/CollectionList";
import { Container, Typography } from "@mui/material";

export function Dashboard() {
    const { loggedInUser } = useContext(UserContext);

    return (
        <>
            {loggedInUser ? (
                <div>
                    <CollectionList />
                </div>
            ) : (
                <div>
                    <Typography variant="h3" gutterBottom>
                        You are not logged in!
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Please log in to access your dashboard and manage your
                        collections.
                    </Typography>
                </div>
            )}
        </>
    );
}
