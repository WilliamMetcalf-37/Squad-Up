import React, { useState, useEffect } from "react"

export const StatusContext = React.createContext()

export const StatusProvider = (props) => {
    const [status, setStatus] = useState([])

    const getStatus = () => {
        return fetch("http://localhost:8088/statuses")
            .then(res => res.json())
            .then(setStatus)
    }


    useEffect(() => {
        getStatus()
    }, [])

    useEffect(() => {
    }, [status])

    return (
        <StatusContext.Provider value={{
            status
        }}>
            {props.children}
        </StatusContext.Provider>
    )
}