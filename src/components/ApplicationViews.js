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
import ChatForm from "./groupchat/ChatForm";
import { DirectMessageProvider } from "./friends/DirectMessageProvider";
import { FriendProvider } from "./friends/FriendProvider";
import { FriendChatProvider } from "./friends/FriendChatProvider";
import FriendList from "./friends/FriendList";
import NotificationList from "./notifications/NotificationList";
import { NotificationProvider } from "./notifications/NotificationProvider";

export default (props) => {
  return (
    <>
      <GroupProvider>
        <EventProvider>
          <UserGroupProvider>
            <UserProvider>
              <StatusProvider>
                <GroupChatProvider>
                  <DirectMessageProvider>
                    <FriendProvider>
                      <FriendChatProvider>
                        <NotificationProvider>

                          <Route exact path="/"
                            render={props => <GroupList {...props} />} />

                          <Route path="/friends"
                            render={props => <FriendList {...props} />} />

                          <Route path="/notifications"
                            render={props => <NotificationList {...props} />} />


                          <Route exact path="/events"
                            render={props => <EventList {...props} />} />

                          <Route exact path="/chat/:groupId(\d+)"
                            render={props => <GroupChatList {...props} />} />

                          <Route exact path="/chat"
                            render={props => <GroupChatListSet {...props} />} />

                          <Route exact path="/chat/create/:groupId(\d+)"
                            render={props => <ChatForm {...props} />} />


                          <Route exact path="/chat/create/:groupId(\d+)/edit/:chatId(\d+)"
                            render={props => <ChatForm {...props} />} />



                        </NotificationProvider>
                      </FriendChatProvider>
                    </FriendProvider>
                  </DirectMessageProvider>
                </GroupChatProvider>
              </StatusProvider>
            </UserProvider>
          </UserGroupProvider>
        </EventProvider>
      </GroupProvider>
    </>
  );
}