import React, { useState, useEffect } from "react";

function App() {

  const [users, setUsers] = useState()
  const [relationships, setRelationships] = useState()
  useEffect(() => {
    updateUsers(setUsers)
    if (users != null) {
     var result = getRelationships(users)
     setRelationships(result)
    }
    console.log(relationships)

  }, [])
  if (users !== undefined) {
    console.log(users)
    console.log(relationships)
  }



  return (
    <div className="App">

    </div>
  )
}


async function updateUsers(setUsers) {
  fetch('http://localhost:8000/getusers')
    .then(response => response.json())
    .then(data => setUsers(data));
}

async function getRelationships(users) {
  var relationships = []
  users.forEach(async (element) => {
    var data = { "from_user": element }
    await fetch(`http://localhost:8000/getrelationship/`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then((res) => res.json())
      .then((res) => { relationships.push(res) });
  })
  return relationships
}



export default App
