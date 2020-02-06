import React, { useContext } from "react"
import { GroupContext } from "../groups/GroupProvider"
import GroupChatCard from "./GroupChatCard"






export default (props)=>{

const {groups}=useContext(GroupContext)



return (

 <>
 {groups.map(gru => <GroupChatCard key={groups.id} group={gru} {...props} />)}
 </>
)
}