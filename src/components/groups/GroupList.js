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
console.log(user)


allTheGroups = myGroups.concat(groupsILead)
console.log("myGro", myGroups)
console.log("lead", groupsILead)
console.log("allthe", allTheGroups.length)

if(allTheGroups.length > user.groupLength){
const patchTheUser = {
  id:currentUser,
  groupLength: allTheGroups.length
}
patchUser(patchTheUser)
    window.alert("You have been added to a new group!")


}




  



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