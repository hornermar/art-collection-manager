import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { CollectionList } from "./CollectionList";

export function Dashboard() {
    const { loggedInUser } = useContext(UserContext);

    return (
        <div>
            <h1>Dashboard</h1>
            <CollectionList />
        </div>
    );
}
