
import React, { useRef } from "react"
import { Link } from "react-router-dom";
import "./Login.css"



const Login = props => {





    const username = useRef()



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

                localStorage.setItem("activeUser", exists.id)
                props.history.push("/")




            })
    }



    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>RaveBook</h1>
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