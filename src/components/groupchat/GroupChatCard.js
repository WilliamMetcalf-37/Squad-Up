import React from "react"
import "./GroupChat.css"





export default ({group, history})=>{




return (

 <>
<div className="groupchatcard" onClick={()=>{
   history.push(`/chat/${group.id}`)
 }} >
  <div className="groupName">
    {group.name}
    </div>
    <div className="groupArtist">
      {group.artist}
      </div>
<div className="groupDate">{group.date}</div>
  
</div>
 </>
)
}