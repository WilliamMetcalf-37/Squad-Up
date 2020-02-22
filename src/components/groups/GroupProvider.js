import React, { useState, useEffect } from "react"

export const GroupContext = React.createContext()

export const GroupProvider = (props) => {
    const [groups, setGroups] = useState([])

    const getGroups = () => {
        return fetch("http://localhost:8088/groups")
            .then(res => res.json())
            .then(setGroups)
    }

    const addGroup = group => {
        return fetch("http://localhost:8088/groups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(group)
        })
            .then(getGroups)
    }

    const deleteGroup = group => {
        return fetch(`http://localhost:8088/groups/${group.id}`, {
            method: "DELETE"
        })
            .then(getGroups)
    }


    const updateGroup = group => {
        return fetch(`http://localhost:8088/groups/${group.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(group)
        })
            .then(getGroups)
    }

    useEffect(() => {
        getGroups()
    }, [])

    useEffect(() => {
    }, [groups])

    return (
        <GroupContext.Provider value={{
            groups, addGroup, deleteGroup, updateGroup
        }}>
            {props.children}
        </GroupContext.Provider>
    )
}