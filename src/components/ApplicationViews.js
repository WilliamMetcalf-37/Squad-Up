import React from "react"
import { Route } from "react-router-dom"
import EventList from "./events/EventList";
import GroupList from "./groups/GroupList";
import GroupChatList from "./groupchat/GroupChatList";
import GroupChatListSet from "./groupchat/GroupChatListSet";
import ChatForm from "./groupchat/ChatForm";
import FriendList from "./friends/FriendList";
import NotificationList from "./notifications/NotificationList";
import UserList from "./users/UserList";
import FriendMessageList from "./friends/FriendMessageList";
import FriendMessageForm from "./friends/FriendMessageForm";
import UserListPending from "./users/UserListPending";
import "./ApplicationViews.css"
import FriendChatList from "./friends/FriendChatList";

export default (props) => {
  return (
    <>
      



        <Route exact path="/"
          render={props => <GroupList {...props} />} />

        <Route exact path="/messages/create/:friendChatId(\d+)"
          render={props => <FriendMessageForm {...props} />} />

        <Route exact path="/messages/create/:friendChatId(\d+)/edit/:directMessageId(\d+)"
          render={props => <FriendMessageForm {...props} />} />

        <Route exact path="/messages/:friendChatId(\d+)"
          render={props => <FriendMessageList {...props} />} />



        <div className="friendStatus">
          <Route exact path="/friends"
            render={props => <UserListPending {...props} />} />


          <Route exact path="/friends"
            render={props => <UserList {...props} />} />

          <Route exact path="/friends"
            render={props => <FriendList {...props} />} />
        </div>

        <Route path="/notifications"
          render={props => <NotificationList {...props} />} />



        <Route exact path="/events"
          render={props => <EventList {...props} />} />

        <Route exact path="/chat/:groupId(\d+)"
          render={props => <GroupChatList {...props} />} />

        <Route exact path="/chat"
          render={props => <GroupChatListSet {...props} />} />
        <Route exact path="/chat"
          render={props => <FriendChatList {...props} />} />

        <Route exact path="/chat/create/:groupId(\d+)"
          render={props => <ChatForm {...props} />} />


        <Route exact path="/chat/create/:groupId(\d+)/edit/:chatId(\d+)"
          render={props => <ChatForm {...props} />} />



      
    </>
  );
}