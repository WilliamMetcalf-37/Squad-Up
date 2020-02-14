import React, { useContext } from "react"
import "./Group.css"
import { GroupContext } from "./GroupProvider"
import Group from "./Group"
import { UserGroupContext } from "./UserGroupProvider"


export default (props) => {
  const { groups } = useContext(GroupContext)
  const { userGroups } = useContext(UserGroupContext)
  const currentUser = parseInt(localStorage.getItem("activeUser"), 10)

  const groupsILead = []
  const myGroups = []

  userGroups.filter(rel => {
    if (rel.userId === currentUser) {
      return myGroups.push(rel.group)
    }
  })

  groups.filter(gru => {
    if (currentUser === gru.groupLeaderId) {
      return groupsILead.push(gru)
    }
  })











  return (
    <>
      <div className="groupsList">
        <div className="groupsILead">
          <div>
            <h2>Squads I Put Together</h2>
          </div>
          <div className="myGroupList">
          {groupsILead.map(group => {
            return <Group key={group.id} group={group} {...props} />
          })
          } 
          </div>
        </div>
        <div className="groupsImIn">
          <div>
        <h2>My Squads</h2>
          </div>
          <div className="myGroupList">
             {
            myGroups.map(group => {
              return <Group key={`${group.id} + ${group.name}`} group={group} {...props} />
            })
          }
          </div>       
        </div>
      </div>
    </>
  )


}