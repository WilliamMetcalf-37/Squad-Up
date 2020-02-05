import React, { useState, useEffect } from "react"

export const UserGroupContext = React.createContext()

export const UserGroupProvider = (props) => {
    const [userGroups, setUserGroups] = useState([])

    const getUserGroups = () => {
        return fetch("http://localhost:8088/userGroups?_expand=user&_expand=group&_expand=status")
            .then(res => res.json())
            .then(setUserGroups)
    }

    const addUserGroup = userGroup => {
        return fetch("http://localhost:8088/userGroups", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userGroup)
        })
            .then(getUserGroups)
    }

    const deleteUserGroup = userGroup => {
        return fetch(`http://localhost:8088/userGroups/${userGroup.id}`, {
            method: "DELETE"
        })
            .then(getUserGroups)
    }


    const patchUserGroup = userGroup => {
        return fetch(`http://localhost:8088/userGroups/${userGroup.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userGroup)
        })
            .then(getUserGroups)
    }

    useEffect(() => {
        getUserGroups()
    }, [])

    useEffect(() => {
    }, [userGroups])

    return (
        <UserGroupContext.Provider value={{
            userGroups, addUserGroup, deleteUserGroup, patchUserGroup
        }}>
            {props.children}
        </UserGroupContext.Provider>
    )
}