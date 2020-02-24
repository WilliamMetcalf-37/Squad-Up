import React, { useState, useEffect } from "react"

export const GroupChatContext = React.createContext()

export const GroupChatProvider = (props) => {
    const [groupChats, setGroupChats] = useState([])

    const getGroupChats = () => {
        return fetch("http://localhost:8088/groupChats?_expand=group&_expand=user")
            .then(res => res.json())
            .then(setGroupChats)
    }

    const addGroupChat = groupChat => {
        return fetch("http://localhost:8088/groupChats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(groupChat)
        })
            .then(getGroupChats)
    }

    const deleteGroupChat = groupChat => {
        return fetch(`http://localhost:8088/groupChats/${groupChat.id}`, {
            method: "DELETE"
        })
            .then(getGroupChats)
    }


    const updateGroupChat = groupChat => {
        return fetch(`http://localhost:8088/groupChats/${groupChat.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(groupChat)
        })
            .then(getGroupChats)
    }

    useEffect(() => {
        getGroupChats()
    }, [])

    useEffect(() => {
    }, [groupChats])

    return (
        <GroupChatContext.Provider value={{
            groupChats, addGroupChat, deleteGroupChat, updateGroupChat
        }}>
            {props.children}
        </GroupChatContext.Provider>
    )
}