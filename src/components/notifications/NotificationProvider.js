import React, { useState, useEffect } from "react"

export const NotificationContext = React.createContext()

export const NotificationProvider = (props) => {
    const [notifications, setNotifications] = useState([])

    const getNotifications = () => {
        return fetch("http://localhost:8088/notifications")
            .then(res => res.json())
            .then(setNotifications)
    }

    const addNotification = Notification => {
        return fetch("http://localhost:8088/notifications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Notification)
        })
            .then(getNotifications)
    }

    const deleteNotification = Notification => {
        return fetch(`http://localhost:8088/notifications/${Notification.id}`, {
            method: "DELETE"
        })
            .then(getNotifications)
    }


    const updateNotification = Notification => {
        return fetch(`http://localhost:8088/notifications/${Notification.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Notification)
        })
            .then(getNotifications)
    }

    useEffect(() => {
        getNotifications()
    }, [])

    useEffect(() => {
    }, [notifications])

    return (
        <NotificationContext.Provider value={{
            notifications, addNotification, deleteNotification, updateNotification
        }}>
            {props.children}
        </NotificationContext.Provider>
    )
}