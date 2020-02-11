import React, { useState, useEffect } from "react"

export const DirectMessageContext = React.createContext()

export const DirectMessageProvider = (props) => {
    const [directMessages, setDirectMessages] = useState([])

    const getDirectMessages = () => {
        return fetch("http://localhost:8088/directMessages?_expand=user")
            .then(res => res.json())
            .then(setDirectMessages)
    }

    const addDirectMessage = directMessage => {
        return fetch("http://localhost:8088/directMessages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(directMessage)
        })
            .then(getDirectMessages)
    }

    const deleteDirectMessage = directMessage => {
        return fetch(`http://localhost:8088/directMessages/${directMessage.id}`, {
            method: "DELETE"
        })
            .then(getDirectMessages)
    }


    const updateDirectMessage = directMessage => {
        return fetch(`http://localhost:8088/directMessages/${directMessage.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(directMessage)
        })
            .then(getDirectMessages)
    }

    useEffect(() => {
        getDirectMessages()
    }, [])

    useEffect(() => {
    }, [directMessages])

    return (
        <DirectMessageContext.Provider value={{
            directMessages, addDirectMessage, deleteDirectMessage, updateDirectMessage
        }}>
            {props.children}
        </DirectMessageContext.Provider>
    )
}