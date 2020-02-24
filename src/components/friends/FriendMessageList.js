import React, { useContext } from "react"
import { DirectMessageContext } from "./DirectMessageProvider"
import FriendChat from "./FriendChat"
import { FriendChatContext } from "./FriendChatProvider"
import { UserContext } from "../users/UserProvider"






export default (props) => {

  const { directMessages } = useContext(DirectMessageContext)
  const { friendChats } = useContext(FriendChatContext)
  const { users } = useContext(UserContext)
  const currentFriendChatId = props.match.params.friendChatId
  const activeUserId = parseInt(localStorage.getItem("activeUser"), 10)
  const currentFriendChat = friendChats.find(friendChat => friendChat.id === parseInt(currentFriendChatId, 10))
  let otherPerson = {}

  const findTheOtherPersonsName = () => {

    if (currentFriendChat.userId === activeUserId) {
      otherPerson = users.find(user => currentFriendChat.activeUserId === user.id) || {}
    } else {
      otherPerson = users.find(user => currentFriendChat.userId === user.id) || {}
    }
    return (<>
      <h2>Chat with {otherPerson.username}</h2>
    </>)




  }


  const filteredDirectMessages = directMessages.filter(message => message.friendChatId === parseInt(currentFriendChatId), 10) || []
  
  return (<>

    <div className="allDirectChat">
      <div className="friendChatBlock">
        {findTheOtherPersonsName()}
        <button className="AddMessage" onClick={() => {
          props.history.push(`/messages/create/${currentFriendChatId}`)
        }}>Write Message</button>
      </div>
      <div className="messages">

        {filteredDirectMessages.map(message => <FriendChat key={message.id} message={message} {...props} />)}
      </div>
    </div>
  </>)

}


