import React from "react"
import { Route, Redirect} from "react-router-dom"
import ApplicationViews from "./ApplicationViews"
import NavBar from "./nav/NavBar"
import Login from "./auth/Login"
import Register from "./auth/Register"
import { GroupProvider } from "./groups/GroupProvider"
import { UserProvider } from "./users/UserProvider"
import { UserGroupProvider } from "./groups/UserGroupProvider"

export default () => (
    <>
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


<GroupProvider>
<UserProvider>
<UserGroupProvider>
    <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
</UserGroupProvider>    
</UserProvider>
</GroupProvider>
          


        
    </>
)