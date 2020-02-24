import React, { useContext } from "react"
import { GroupContext } from "../groups/GroupProvider"
import GroupChatCard from "./GroupChatCard"
import { UserGroupContext } from "../groups/UserGroupProvider"
import "./GroupChat.css"





export default (props)=>{

const { groups } = useContext(GroupContext)
const { userGroups } = useContext(UserGroupContext)
const currentUser = parseInt(localStorage.getItem("activeUser"), 10)
const groupsILead = []
const myGroups = []
let allTheGroups = []
userGroups.filter(rel=>{
if(rel.userId===currentUser){
  myGroups.push(rel.group)
}
})

groups.filter(gru => {
  if (currentUser === gru.groupLeaderId) {
    groupsILead.push(gru)
  }
})



allTheGroups = myGroups.concat(groupsILead)







return (

 <>
 <div className="groupChatCardList">
   <h2>Group Chat</h2>
 
 <div className="groupChatButtonCards">
 {allTheGroups.map(gru => <GroupChatCard key={groups.id} group={gru} {...props} />)}
 </div>
 </div>
 </>
)
}