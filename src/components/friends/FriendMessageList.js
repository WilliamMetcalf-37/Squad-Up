import React, { useContext } from "react"
import { DirectMessageContext } from "./DirectMessageProvider"
import FriendChat from "./FriendChat"






export default (props) => {

const {directMessages} = useContext(DirectMessageContext)

const currentFriendChatId = props.match.params.friendChatId


if(currentFriendChatId){
const filteredDirectMessages = directMessages.filter(message=>message.friendChatId === parseInt(currentFriendChatId),10)||[]
console.log(filteredDirectMessages)
return (<>
<div>
<button className="AddMessage" onClick={() => {
            props.history.push(`/message/create/${currentFriendChatId}`)
          }}>Write Message</button>
</div>
{filteredDirectMessages.map(message=> <FriendChat key={message.id} message={message}/>)}
</>)

}


}