import React from "react"
import { GroupProvider } from "./groups/GroupProvider";
import { EventProvider } from "./events/EventProvider";
import { UserGroupProvider } from "./groups/UserGroupProvider";
import { UserProvider } from "./users/UserProvider";
import { StatusProvider } from "./groups/StatusProvider";
import { GroupChatProvider } from "./groupchat/GroupChatProvider";
import { DirectMessageProvider } from "./friends/DirectMessageProvider";
import { FriendProvider } from "./friends/FriendProvider";
import { FriendChatProvider } from "./friends/FriendChatProvider";
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

                          {props.children}
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
  )

}