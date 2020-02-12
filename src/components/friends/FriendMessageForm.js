
import React, { useContext, useState, useEffect } from "react"
import { DirectMessageContext } from "./DirectMessageProvider"




export default props => {
  const { directMessages, addDirectMessages, updateDirectMessages } = useContext(DirectMessageContext)
  const editMode = props.match.params.hasOwnProperty("friendChatId")
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
      const friendChatId = parseInt(props.match.params.friendChatId)
      const selectedMessage = directMessages.find(m => m.id === friendChatId) || {}
      setMessage(selectedMessage)
    }
  }


  useEffect(() => {
    setDefaults()
  }, [directMessages])
  const constructNewMessage = () => {
    if (editMode) {
      updateDirectMessages({
        id: message.id,
        message: message.message,
        friendChatId: message.friendChatId,
        userId: message.userId
      }).then(() => props.history.push(`/messages/${message.friendChatId}`))

    } else {
      addDirectMessages({
        message: message.message,
        friendChatId: parseInt(props.match.params.friendChatId, 10),
        userId: parseInt(localStorage.getItem("activeUser"))
      }).then(() => {
        props.history.push(`/messages/${props.match.params.friendChatId}`)
    })
    }

  }

  return (
    <form className="messageForm">
      <h2 className="messageForm__title">{editMode ? "Update Message" : "Write Message"}</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">message name: </label>
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