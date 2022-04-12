import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import AddProject from './components/AddProject';

const App = () => {

  const [searchText, setSearchText] = useState('');

  const [filteredArray, setFilteredArray] = useState([])

  const [showAddProject, setShowAddProject] = useState(false);

  useEffect(() => {

    let search = dataArray.filter((data) => data.name.includes(searchText) || data.description.includes(searchText) )
    if(search) setFilteredArray(search);
  }, [searchText])

  const [dataArray, setDataArray] = useState([
    {
      name: 'project_1',
      description: 'pro_1_desc',
      skill: ['React Js, Node Js, Gatsby Js'],
      members: 5,
      isActive: true,
      createdAt: new Date().toLocaleString()
    },

    {
      name: 'project_2',
      description: 'pro_2_desc',
      skill: ['React Js, Node Js, Gatsby Js'],
      members: 2,
      isActive: false,
      createdAt: new Date().toLocaleString()
    }
  ])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit clicked');
  } 


  return (
   <>
    {/* Table Section */}
    <section className='w-screen h-screen bg-white'>

      {/* Top section */}
      <div className='px-5 my-5 d-flex flex-row justify-content-between'>
        <Button onClick={() => setShowAddProject(!showAddProject)} variant="primary">
          Add Project
        </Button>
        
        <form onSubmit={(e) => handleSubmit(e)}>
          <input 
            type="text" 
            className='px-5 py-2 rounded border border-black'
            placeholder='Search...'
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>

      </div>
    
      <Table striped bordered hover size="sm" className='container'>
        <thead>
          <tr>
            <th  style={{color: 'black'}}>
              Project Name
            </th>

            <th style={{color: 'black'}}>
              Project	Description
            </th>

            <th style={{color: 'black'}}>
              Skill	Set
            </th>

            <th style={{color: 'black'}}>
              No of Members
            </th>

            <th style={{color: 'black'}}>
              Is	Active?
            </th>

            <th style={{color: 'black'}}>
              Created At
            </th>
          </tr>
        </thead>
        <tbody>

        {filteredArray.length ? filteredArray.map((data, index) => {
          return(
            <tr key={index}>
              <td style={{color: 'black'}}>
                {data.name}
              </td>

              <td style={{color: 'black'}}>
                {data.description}
              </td>

              <td style={{color: 'black'}}>
                {data.skill.map((item, index) => {
                  if(index !== data.skill.length -1){
                    return(
                      `${item}, ` 
                    )
                  }else {
                    return(
                      item
                    )
                  }
                })}
              </td>

              <td style={{color: 'black'}}>
                {data.members}
              </td>

              <td style={{color: 'black'}}>
                {data.isActive ? 'Yes' : 'No'}
              </td>
              
              <td style={{color: 'black'}}>
                {data.createdAt}
              </td>
            </tr>
          )
        }) : null}
          
          {!filteredArray.length && dataArray.map((data, index) => {
          return(
            <tr key={index}>
              <td style={{color: 'black'}}>
                {data.name}
              </td>

              <td style={{color: 'black'}}>
                {data.description}
              </td>

              <td style={{color: 'black'}}>
                {data.skill.map((item, index) => {
                  if(index !== data.skill.length -1){
                    return(
                      `${item}, ` 
                    )
                  }else {
                    return(
                      item
                    )
                  }
                })}
              </td>

              <td style={{color: 'black'}}>
                {data.members}
              </td>

              <td style={{color: 'black'}}>
                {data.isActive ? 'Yes' : 'No'}
              </td>
              
              <td style={{color: 'black'}}>
                {data.createdAt}
              </td>
            </tr>
          )
        })}
          
        </tbody>
      </Table>

    </section>

    {/* Add Project Section */}
    {showAddProject &&
      <section>
        <AddProject setDataArray={setDataArray} setShowAddProject={setShowAddProject} />
      </section>
    }

   </>
  );
}

export default App;
