import React from "react"
import { Route, Redirect} from "react-router-dom"
import ApplicationViews from "./ApplicationViews"
import NavBar from "./nav/NavBar"
import Login from "./auth/Login"
import Register from "./auth/Register"
import ProviderProvider from "./ProviderProvider"
import './SquadUp.css'

export default () => (
    <>
    <ProviderProvider>

        <Route render={() => {
            if (localStorage.getItem("activeUser")) {
                return (
                    <>

                        <Route render={props => <NavBar {...props} />} />
                    
                        <Route render={props => <ApplicationViews {...props} />} />
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />



    <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />

          
</ProviderProvider>
  
        
    </>
)