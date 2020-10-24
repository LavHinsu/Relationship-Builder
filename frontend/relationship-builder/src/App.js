import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import axios from "axios"
function App() {
  const [users, setUsers] = useState();
  const [displayUsers, setdisplayUsers] = useState([]);
  const [dataloading, setDataloading] = useState(null);
  const [relationships, setRelationships] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      // You can await here
      setDataloading(true)
      const response = await axios.get('http://localhost:8000/getusers')
        .then(async (res) => await res.data)
        .catch(async (err) => { await console.log(err.message) })
      setUsers(response)
      var tempObject = [];
      for (var i = 0; i < response.length; i++) {
        var object = { "id": i, "user_name": response[i] }
        tempObject.push(object)
      }
      setdisplayUsers(tempObject)
      setDataloading(false)
      return response
    }
    fetchUsers()

  }, []);


  useEffect(() => {
    if (dataloading === false) {
      if (users !== null) {
        setDataloading(true)
        fetchRelationships(users)
        setDataloading(false)
      }

    }
  }, [dataloading, users])





  async function fetchRelationships(users) {
    var resarr = []
    for (var i = 0; i < users.length; i++) {
      let url = `http://localhost:8000/getrelationship`
      let data = { "from_user": users[i] }
      var res = await axios.post(url, data)
      res.data.forEach(element => {
        resarr.push(element)
      });
    }
    setRelationships(resarr)

  }


  const relationshipcolumns = [{
    dataField: 'from_user',
    text: 'From Person'
  }, {
    dataField: 'tag',
    text: 'Related as (tag)'
  }, {
    dataField: 'to_user',
    text: 'To Person'
  }];

  const userscolumns = [{
    dataField: 'id',
    text: 'Sr #'
  }, {
    dataField: 'user_name',
    text: 'User Name'
  }];


  return (
    <div >
      {/* add users here */}
      <div className="container mt-5 ml-4 justify-content-start">
        <div class="input-group ml-2 col-md-4">
          <input type="text" class="form-control" placeholder="username" aria-label="username" aria-describedby="basic-addon2" />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button">Add User</button>
          </div>
        </div>
      </div>
      <div className="container mt-4 mx-5">
      {/* display users here */}
        <div className="row">
          <div className="col-md-3 ">
            <BootstrapTable keyField='id' data={displayUsers} columns={userscolumns} />
          </div>
        </div>
      </div>
      <div className="container mt-1 ml-4 justify-content-start">
        {/* add person here */}
        <div class="input-group">
          <div class="input-group-prepend ml-4 ">
            <span class="input-group-text">From, Tag, To</span>
          </div>
          <input className="col-md-2" placeholder="From Person" type="text" aria-label="From" class="form-control" />
          <input className="col-md-2" placeholder="Tag" type="text" aria-label="Tag" class="form-control" />
          <input className="col-md-2" placeholder="To Person" type="text" aria-label="To" class="form-control" />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button">Add Relation</button>
          </div>
          <div class="badge text-wrap font-italic font-weight-light ml-4" style={{ "width": "9rem" }} >
            Persons should exist before adding!
        </div>
        </div>


        {/* edit person here */}
        <div class="input-group mt-1">
          <div class="input-group-prepend ml-4 ">
            <span class="input-group-text">From, Tag, To</span>
          </div>
          <input className="col-md-2" placeholder="From Person" type="text" aria-label="From" class="form-control" />
          <input className="col-md-2" placeholder="Tag" type="text" aria-label="Tag" class="form-control" />
          <input className="col-md-2" placeholder="To Person" type="text" aria-label="To" class="form-control" />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button">Edit Relation</button>
          </div>
          <div class="badge text-wrap font-italic font-weight-light ml-4" style={{ "width": "9rem" }} >
            add relationships before editing them!
        </div>
        </div>
      {/* display relationships here */}
      </div>
      <div className="mt-3 mb-4 mx-5 col-md-5 ">
        <BootstrapTable keyField='id' data={relationships} columns={relationshipcolumns} />
      </div>


    </div>
  );
}

export default App;
