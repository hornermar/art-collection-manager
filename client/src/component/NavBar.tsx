import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function NavBar() {
    const { userList, loggedInUser, handlerMap } = useContext(UserContext);

    return (
        <div
            style={{
                border: "1px solid red",
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
            }}
        >
            <div>Art Collection Manager</div>
            <div>
                {userList.map((user: any) => (
                    <button
                        key={user.id}
                        onClick={() => handlerMap.login(user.id)}
                        style={{
                            backgroundColor:
                                loggedInUser && loggedInUser.id === user.id
                                    ? "lightblue"
                                    : "white",
                        }}
                    >
                        {user.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
