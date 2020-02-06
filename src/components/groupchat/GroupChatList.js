import React, { useContext } from "react"
import { GroupChatContext } from "./GroupChatProvider"
import GroupChat from "./GroupChat"
import "./GroupChat.css"




export default (props) => {
  const { groupChats } = useContext(GroupChatContext)


  const currentGroupId = props.match.params.groupId


  if (currentGroupId) {
    const filteredGroupChats = groupChats.filter(chat => chat.groupId === parseInt(currentGroupId, 10)) || []

    const foundGroup = groupChats.find(chat => chat.groupId === parseInt(currentGroupId, 10)) || {}

    return (

      <>

        <div className="currentGroup">
          <div>
            {foundGroup.group.name}
          </div>
          <div>
            {foundGroup.group.artist}
          </div>
          <div>
            {foundGroup.group.date}
          </div>
          <button className="AddMessage" onClick={() => {
            props.history.push(`/chat/create/${currentGroupId}`)
          }}>Write Message</button>
        </div>

        {filteredGroupChats.map(chat => <GroupChat key={chat.id} message={chat} {...props} />)}
      </>
    )
  }
}