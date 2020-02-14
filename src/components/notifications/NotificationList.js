import React, { useContext } from "react"
import { NotificationContext } from "./NotificationProvider"
import Notification from "./Notification"


export default (props) => {

  const { notifications } = useContext(NotificationContext)

  const usersNotifications = notifications.filter(not => not.activeUserId === parseInt(localStorage.getItem("activeUser"), 10))

  return (
    <>
      <div className="allTheNotifications">
        <div className="notificationTitle">

          <h1>Notifications</h1>
        </div>
        <div className="notifications">

          {
            usersNotifications.map(not => <Notification key={not.id} notification={not}    {...props} />)
          }
        </div>
      </div>
    </>
  )


}