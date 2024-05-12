import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CollectionList } from "./CollectionList/CollectionList";
import { Title } from "./Title";

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
                    <Title
                        title="  You are not logged in!"
                        description="   Please log in to access your dashboard and manage your
                        collections."
                    />
                </div>
            )}
        </>
    );
}
