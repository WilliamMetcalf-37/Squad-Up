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



  return (
    <>
      <div className="groupsList">

        <div className="groupsILead">
          <h2>Groups I Put Together</h2>
          {
            groupsILead.map(group => {
              return <Group key={group.id} group={group} {...props} />
            })
          }
        </div>
        <div className="groupsImIn">
          <h2>my Groups</h2>
          {
            myGroups.map(group => {
              return <Group key={group.id} group={group} {...props} />
            })
          }
        </div>

      </div>
    </>
  )


}