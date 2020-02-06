
import React, { useContext, useState, useEffect } from "react"
import { GroupChatContext } from "./GroupChatProvider"



export default props => {
    const {groupChats, addGroupChat, updateGroupChat} = useContext(GroupChatContext)
    
    const editMode = props.match.params.hasOwnProperty("chatId")
    
    const [chat, setChat] = useState({})
    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newChat = Object.assign({}, chat)
        newChat[event.target.name] = event.target.value
        setChat(newChat)
    }

    const setDefaults = () => {
        if (editMode) {
            const chatId = parseInt(props.match.params.chatId)
            const selectedChat = groupChats.find(c => c.id === chatId) || {}
            setChat(selectedChat)
        }
    }

    useEffect(() => {
        setDefaults()
    }, [groupChats])

    const constructNewMessage = () => {
            if (editMode) {
                updateGroupChat({ 
                    id: chat.id,
                    message: chat.message,
                    groupId: chat.groupId,
                    userId: chat.userId
                })
                    .then(() => props.history.push(`/chat/${chat.groupId}`))
            } else {
                addGroupChat({
                    message: chat.message,
                    groupId:parseInt(props.match.params.groupId,10),
                    userId: parseInt(localStorage.getItem("activeUser"))
                })
                    .then(() => {
                        props.history.push(`/chat/${props.match.params.groupId}`)
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
                        defaultValue={chat.message}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group"> 
                    <input type="hidden" name="groupId" className="form-control"
                        proptype="int"
                        defaultValue={chat.groupId}
                    />
                </div>
            </fieldset>
           

            <button type="submit"
                onClick={evt => {
                    if(chat.message === ""){
                        window.alert("Please fill out all input fields")
                    }else{
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