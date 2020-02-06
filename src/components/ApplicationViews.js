import React from "react"
import { Route } from "react-router-dom"
import EventList from "./events/EventList";
import { EventProvider } from "./events/EventProvider";
import { GroupProvider } from "./groups/GroupProvider";
import { GroupChatProvider } from "./groupchat/GroupChatProvider";
import { UserGroupProvider } from "./groups/UserGroupProvider";
import GroupList from "./groups/GroupList";
import { UserProvider } from "./users/UserProvider";
import { StatusProvider } from "./groups/StatusProvider"
import GroupChatList from "./groupchat/GroupChatList";
import GroupChatListSet from "./groupchat/GroupChatListSet";

export default (props) => {
  return (
    <>
      <GroupProvider>
        <EventProvider>
          <UserGroupProvider>
            <UserProvider>
              <StatusProvider>
                <GroupChatProvider>




                  <Route exact path="/"
                    render={props => <GroupList {...props} />} />

                  <Route exact path="/events"
                    render={props => <EventList {...props} />} />

                  <Route exact path="/chat/:groupId(\d+)"
                    render={props => <GroupChatList {...props} />} />

                  <Route exact path="/chat"
                    render={props => <GroupChatListSet {...props} />} />


                </GroupChatProvider>
              </StatusProvider>
            </UserProvider>
          </UserGroupProvider>
        </EventProvider>
      </GroupProvider>
    </>
  );
}