import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import axios from "axios"
function App() {
  const [users, setUsers] = useState();
  const [displayUsers, setdisplayUsers] = useState([]);
  const [dataloading, setDataloading] = useState(null);
  const [relationships, setRelationships] = useState([]);


  const [addUser, setAddUser] = useState()
  const [addfrom, setAddfrom] = useState()
  const [addTag, setAddTag] = useState()
  const [addTo, setAddTo] = useState()

  const [editfrom, setEditfrom] = useState()
  const [editTag, setEditTag] = useState()
  const [editTo, setEditTo] = useState()

  const [findFrom, setFindFrom] = useState()
  const [findTo, setFindTo] = useState()

  const [connection, setConnection] = useState('Add users and relationships, then search')

  useEffect(() => {

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

  async function fetchUsers() {
    // You can await here
    setDataloading(true)
    const response = await axios.get('http://localhost:8000/getusers/',
    {headers: {
      'Access-Control-Allow-Origin': '*',
    }})
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
      <div className="container mt-5 ml-4 ">
        <div class="input-group ml-2 col-md-4">
          <input type="text" className="col-md-6" class="form-control" placeholder="username" aria-label="username" aria-describedby="basic-addon2" onChange={(evt) => { setAddUser(evt.target.value); }} />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button"
              onClick={() => {
                let url = "http://localhost:8000/useradd/"
                var body = {
                  "name": addUser
                }
                axios.post(url, body)
                  .then(async () => await fetchUsers())
                  .then(alert("sucessfull"))
                  .catch((err) => { console.log(err) })
              }}>
              Add User</button>
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
          <input className="col-md-2" placeholder="From Person" type="text" aria-label="From" class="form-control" onChange={(evt) => { setAddfrom(evt.target.value); }} />
          <input className="col-md-2" placeholder="Tag" type="text" aria-label="Tag" class="form-control" onChange={(evt) => { setAddTag(evt.target.value); }} />
          <input className="col-md-2" placeholder="To Person" type="text" aria-label="To" class="form-control" onChange={(evt) => { setAddTo(evt.target.value); }} />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" onClick={() => {
              let url = "http://localhost:8000/relationshipadd/"
              var body = {
                "from_user": addfrom,
                "to_user": addTo,
                "tag": addTag
              }
              axios.post(url, body)
                .then(async () => {await fetchRelationships(users)})
                .then(alert("sucessfull"))
                .catch((err) => { console.log(err) })
            }}>Add Relation</button>
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
          <input className="col-md-2" placeholder="From Person" type="text" aria-label="From" class="form-control" onChange={(evt) => { setEditfrom(evt.target.value); }} />
          <input className="col-md-2" placeholder="Tag" type="text" aria-label="Tag" class="form-control" onChange={(evt) => { setEditTag(evt.target.value); }} />
          <input className="col-md-2" placeholder="To Person" type="text" aria-label="To" class="form-control" onChange={(evt) => { setEditTo(evt.target.value); }} />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" onClick={() => {
              console.log(editfrom, editTag, editTo)
              let url = "http://localhost:8000/updaterelation/"
              var body = {
                "from_user": editfrom,
                "to_user": editTo,
                "tag": editTag
              }
              console.log(body)
              axios.post(url, body)
                .then(async () =>{await fetchRelationships(users)})
                .then(alert("sucessfull"))
                .catch((err) => { console.log(err) })



            }}>Edit Relation</button>
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

      {/* find relationship between two person */}

      <div className="container my-3 ml-4 col-md-6">
        <div class="input-group">
          <div class="input-group-prepend ml-4 ">
            <span class="input-group-text">From,To</span>
          </div>
          <input className="col-md-1" placeholder="From Person" type="text" aria-label="From" class="form-control" onChange={(evt) => { setFindFrom(evt.target.value); }} />
          <input className="col-md-1" placeholder="To Person" type="text" aria-label="Tag" class="form-control" onChange={(evt) => { setFindTo(evt.target.value); }} />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" onClick={() => {
              let url = "http://localhost:8000/getconnections/"
              var body = {
                "from_user": findFrom,
                "to_user": findTo,
              }
              axios.post(url, body)
                .then((res) => {
                  if (res.data.length === 0) {
                    setConnection("No Connection Found")
                  }
                  else {
                    var series = "" + res.data[0]
                    for (var i = 1; i < res.data.length; i++) {
                      series += " >> " + res.data[i]
                    }
                    setConnection(series)
                  }
                }
                )

                .catch((err) => { console.log(err) })
            }}>Find Chain</button>
          </div>
          <div class="badge text-wrap font-italic font-weight-light ml-4" style={{ "width": "9rem" }} >
            Find Relation Between Two Persons
          </div>

        </div>

      </div>
      <p className="container my-3 mx-5 font-weight-bold" >{connection}</p>
    </div>
  );
}

export default App;
