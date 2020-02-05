import React from "react"
import { Route } from "react-router-dom"
import EventList from "./events/EventList";
import { EventProvider } from "./events/EventProvider";
import { GroupProvider } from "./groups/GroupProvider";
import { UserGroupProvider } from "./groups/UserGroupProvider";
import GroupList from "./groups/GroupList";
import { UserProvider } from "./users/UserProvider";
import {StatusProvider} from "./groups/StatusProvider"

export default (props) => {
  return (
    <>
      <GroupProvider>
        <EventProvider>
          <UserGroupProvider>
          <UserProvider>
          
<StatusProvider>



            <Route exact path="/" 
render={props=><GroupList {...props}/>}/>



            <Route exact path="/events" 
render={props=><EventList {...props}/>}/>
         


            </StatusProvider>
            </UserProvider>
          </UserGroupProvider>
        </EventProvider>
      </GroupProvider>
    </>
  );
}