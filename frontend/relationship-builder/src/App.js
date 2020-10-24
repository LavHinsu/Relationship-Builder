import React, { useEffect, useState } from 'react';
import axios from "axios"
function App() {
  const [users, setUsers] = useState();
  const [relationships, setRelationships] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      // You can await here
      const response = await axios.get('http://localhost:8000/getusers')
        .then(async (res) => await res.data)
        .then((users) => setUsers(users))
        .catch(async (err) => { await console.log(err.message) })
      return response

    }
    fetchUsers().then((res) => setUsers(res))
   
  }, []);


  if (users !== undefined) {
    console.log(users)
  }
  if (relationships !== undefined) {
    console.log(relationships)
  }



  return (
    <div className="App">

    </div>
  );
}

export default App;
