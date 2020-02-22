
import React, { useContext, useState, useEffect } from "react"
import { DirectMessageContext } from "./DirectMessageProvider"
import { NotificationContext } from "../notifications/NotificationProvider"
import { FriendChatContext } from "./FriendChatProvider"





export default props => {
  const { directMessages, addDirectMessage, updateDirectMessage } = useContext(DirectMessageContext)
  const {addNotification} = useContext(NotificationContext)
  const {friendChats} = useContext(FriendChatContext)
  const editMode = props.match.params.hasOwnProperty("directMessageId")
  const [message, setMessage] = useState({})
  const handleControlledInputChange = (event) => {
    /*
        When changing a state object or array, always create a new one
        and change state instead of modifying current one
    */
    const newMessage = Object.assign({}, message)
    newMessage[event.target.name] = event.target.value
    setMessage(newMessage)
  }

  const setDefaults = () => {
    if (editMode) {
      const directMessageId = parseInt(props.match.params.directMessageId)
      const selectedMessage = directMessages.find(m => m.id === directMessageId) || {}
      setMessage(selectedMessage)
    }
  }


  useEffect(() => {
    setDefaults()
  }, [directMessages])
  const constructNewMessage = () => {
    if (editMode) {
      updateDirectMessage({
        id: message.id,
        message: message.message,
        friendChatId: message.friendChatId,
        userId: message.userId
      }).then(() => props.history.push(`/messages/${message.friendChatId}`))

    } else {
      addDirectMessage({
        message: message.message,
        friendChatId: parseInt(props.match.params.friendChatId, 10),
        userId: parseInt(localStorage.getItem("activeUser"))
      }).then(()=>{

        const currentFriendChatId = parseInt(props.match.params.friendChatId,10)
        const currentFriendChat = friendChats.find(fc=>fc.id === currentFriendChatId)||{}
        let userMessageWasSentToId = null
        if(currentFriendChat.userId===parseInt(localStorage.getItem("activeUser"),10)){
          userMessageWasSentToId = currentFriendChat.activeUserId
        } else {
          userMessageWasSentToId = currentFriendChat.userId
        }

            const newNotification = {
                    notificationTypeId: 1,
                    userId: parseInt(localStorage.getItem("activeUser"),10),
                     activeUserId: userMessageWasSentToId
            }

            addNotification(newNotification)
      })
      .then(() => {
        props.history.push(`/messages/${props.match.params.friendChatId}`)
    })
    }

  }

  return (
    <form className="messageForm">
      <h2 className="messageForm__title">{editMode ? "Update Message" : "Write Message"}</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Message: </label>
          <input type="text" name="message" required autoFocus className="form-control"
            proptype="varchar"
            placeholder="Write your message Here!"
            defaultValue={message.message}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <input type="hidden" name="groupId" className="form-control"
            proptype="int"
            defaultValue={message.friendChatId}
          />
        </div>
      </fieldset>


      <button type="submit"
        onClick={evt => {
          if (message.message === "") {
            window.alert("Please fill out all input fields")
          } else {
            evt.preventDefault()
            constructNewMessage()
          }

        }}
        className="btn btn-primary">
        {editMode ? "Save Updates" : "Create Message"}
      </button>
    </form>
  )
}