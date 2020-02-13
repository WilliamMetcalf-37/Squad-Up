import React, { useState, useEffect } from "react"

export const FriendContext = React.createContext()

export const FriendProvider = (props) => {
    const [friends, setFriends] = useState([])

    const getFriends = () => {
        return fetch("http://localhost:8088/friends?_expand=user")
            .then(res => res.json())
            .then(setFriends)
    }

    const addFriend = Friend => {
        return fetch("http://localhost:8088/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Friend)
        })
            .then(getFriends)
    }

    const deleteFriend = Friend => {
        return fetch(`http://localhost:8088/friends/${Friend.id}`, {
            method: "DELETE"
        })
            .then(getFriends)
    }


    const patchFriend = Friend => {
        return fetch(`http://localhost:8088/friends/${Friend.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Friend)
        })
            .then(getFriends)
    }

    useEffect(() => {
        getFriends()
    }, [])

    useEffect(() => {
    }, [friends])

    return (
        <FriendContext.Provider value={{
            friends, addFriend, deleteFriend, patchFriend
        }}>
            {props.children}
        </FriendContext.Provider>
    )
}