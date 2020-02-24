import React, { useState, useEffect } from "react"

export const FriendChatContext = React.createContext()

export const FriendChatProvider = (props) => {
    const [friendChats, setFriendChats] = useState([])

    const getFriendChats = () => {
        return fetch("http://localhost:8088/friendsChats")
            .then(res => res.json())
            .then(setFriendChats)
    }

    const addFriendChat = FriendChat => {
        return fetch("http://localhost:8088/friendsChats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(FriendChat)
        })
            .then(getFriendChats)
    }

    const deleteFriendChat = FriendChat => {
        return fetch(`http://localhost:8088/friendsChats/${FriendChat.id}`, {
            method: "DELETE"
        })
            .then(getFriendChats)
    }


    const updateFriendChat = FriendChat => {
        return fetch(`http://localhost:8088/friendsChats/${FriendChat.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(FriendChat)
        })
            .then(getFriendChats)
    }
    const patchFriendChat = FriendChat => {
        return fetch(`http://localhost:8088/friendsChats/${FriendChat.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(FriendChat)
        })
            .then(getFriendChats)
    }

    useEffect(() => {
        getFriendChats()
    }, [])

    useEffect(() => {
    }, [friendChats])

    return (
        <FriendChatContext.Provider value={{
            friendChats, addFriendChat, deleteFriendChat, updateFriendChat, patchFriendChat
        }}>
            {props.children}
        </FriendChatContext.Provider>
    )
}