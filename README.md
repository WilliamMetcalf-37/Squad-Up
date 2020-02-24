## Squad Up!

Squad Up! is a social media-like application
## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install Squad Up!

```bash
npm i --save react-router-dom
npm start from the root directory to run application
```

## Database sample
Create a json file, database.json,  using the provided data, and run the server on port 8088


```bash
json-server -w database.json -p 8088
```
```
{
  "users": [
    {
      "id": 1,
      "username": "GroupChatRobot",
      "password": "1",
      "firstName": "robot",
      "lastName": "robot"
    },
  
  ],
  "userGroups": [
 
  ],
  "groups": [
   
  ],
  "groupChats": [
    
  ],
  "friends": [
    
  ],
  "friendsChats": [
  
  ],
  "directMessages": [
    
  ],
  "notifications": [
   
  ],
  "notificationType": [
    {
      "id": 1,
      "type": "Message"
    },
    {
      "id": 2,
      "type": "Friend"
    },
    {
      "id": 3,
      "type": "Squad"
    },
    {
      "id": 4,
      "type": "Squad Removed"
    },
    {
      "id": 5,
      "type": "Unfriended"
    }
  ],
  "statuses": [
    {
      "id": 1,
      "status": "Pending"
    },
    {
      "id": 2,
      "status": "Joined Squad"
    },
    {
      "id": 4,
      "status": "Purchased a Ticket"
    },
    {
      "id": 5,
      "status": "Need $ Assistance"
    }
  ]
}
```

## Usage
1. Register as a new user/ login with existing username and password.
2. Navigate to friends tab and click 'add friend' button on friend you want to add
3. Navigate to Events by EDM Train tab
4. Click 'Create Squad' button on Event you would like to make a squad for.
5. Navigate to Squads tab to view your squads
6. Use dropdown to add your friends to your squad.
7. Navigate to Chat tab to view all available chats.
8. Click on desired chat to view chat history and write new messages