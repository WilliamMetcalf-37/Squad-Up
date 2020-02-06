import React, { useContext } from "react"
import { GroupChatContext } from "./GroupChatProvider"
import GroupChat from "./GroupChat"
import "./GroupChat.css"




export default (props)=>{
const {groupChats}= useContext(GroupChatContext)


 const currentGroupId = props.match.params.groupId
 

if(currentGroupId){
const filteredGroupChats = groupChats.filter(chat=>chat.groupId === parseInt(currentGroupId,10))
console.log(filteredGroupChats)

const foundGroup = groupChats.find(chat=>chat.groupId === parseInt(currentGroupId,10)) || {}
console.log(foundGroup)
return (

 <>

<div className="currentGroup">
 {foundGroup.group.name}
 <button className="AddMessage"onClick={()=>{
   props.history.push(`/chat/create/${currentGroupId}`)
 }}>Write Message</button>
</div>

 {filteredGroupChats.map(chat=><GroupChat key={chat.id} message={chat} {...props}/>)}
 </>
)
}
}