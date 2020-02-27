
import React, { useRef } from "react"
import "./Login.css"

const Register = props => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()


    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/customers?username=${username.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return true
                }
                return false
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()


        existingUserCheck()
            .then(() => {
                fetch("http://localhost:8088/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username.current.value,
                        firstName: firstName.current.value,
                        lastName: lastName.current.value
                    })
                })
                    .then(_ => _.json())
                    .then(createdUser => {
                        if (createdUser.hasOwnProperty("id")) {
                            localStorage.setItem("activeUser", createdUser.id)
                            props.history.push("/")
                        }
                    })
            })

    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register to RaveBook</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First name"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last name"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Username </label>
                    <input ref={username} type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        required />
                </fieldset>

                <fieldset>
                    <button type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
        </main>
    )
}

export default Register