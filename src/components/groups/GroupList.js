import React, { useContext } from "react"
import "./Group.css"
import { GroupContext } from "./GroupProvider"
import Group from "./Group"
import { UserGroupContext } from "./UserGroupProvider"
import { UserContext } from "../users/UserProvider"

export default (props) => {
  const { groups } = useContext(GroupContext)
  const { userGroups } = useContext(UserGroupContext)
  const currentUser = parseInt(localStorage.getItem("activeUser"), 10)
  const {users, patchUser}= useContext(UserContext)
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
const user = users.find(use=> use.id === currentUser) || {}



allTheGroups = myGroups.concat(groupsILead)

if(allTheGroups.length > user.groupLength){
const patchTheUser = {
  id:currentUser,
  groupLength: allTheGroups.length
}
patchUser(patchTheUser).then(()=>{
  window.confirm("You have been added to a new group!")
})
    


}




  



  return (
    <>
      <div className="groupsList">

        <div className="groupsILead">
          <h2>Squads I Put Together</h2>
          {groupsILead.map(group => {
                return <Group key={group.id} group={group} {...props} />
              })
            }
        </div>
        <div className="groupsImIn">
          <h2>My Squads</h2>
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