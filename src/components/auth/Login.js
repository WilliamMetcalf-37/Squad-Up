
import React, { useRef, useContext } from "react"
import { Link } from "react-router-dom";
import "./Login.css"
import { UserGroupContext } from "../groups/UserGroupProvider";
import { GroupContext } from "../groups/GroupProvider";
import { UserContext } from "../users/UserProvider";


const Login = props => {
 




    const username= useRef()
    const password = useRef()
    const firstName = useRef()
    const lastName = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?username=${username.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return user[0]
                }
                return false
            })
    }

    const handleLogin = (e) => {
        
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    localStorage.setItem("activeUser", exists.id)
                    props.history.push("/")
                } else if (exists && exists.password !== password.current.value) {
                    window.alert("Password does not match")
                } else if (!exists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: username.current.value,
                            password: password.current.value,
                            firstName: firstName.current.value,
                            lastName: lastName.current.value,
                            groupLength:0
                        })
                    })
                        .then(_ => _.json())
                        .then(response => {
                            localStorage.setItem("activeUser", response.id)
                            props.history.push("/")

                       


                        })
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Squad Up!</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Username </label>
                        <input ref={username} type="text"
                            id="username"
                            className="form-control"
                            placeholder="Username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                    </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a registered user yet?</Link>
            </section>
        </main>
    )
}
export default Login