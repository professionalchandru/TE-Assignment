import React, { useEffect, useState } from 'react'
// import { Button, Table } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import AddProject from './components/AddProject';

const App = () => {

  const [searchText, setSearchText] = useState('');

  const [filteredArray, setFilteredArray] = useState([])

  const [showAddProject, setShowAddProject] = useState(false);

  const [editData, setEditData] = useState({})

  const [isEdit, setIsEdit] = useState(false);

  const [error, setError] = useState('')

  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    if(searchText.length){
      let search = dataArray.filter((data) => data.name.includes(searchText) || data.description.includes(searchText) )
      if(search) setFilteredArray(search);
    }else {
      setFilteredArray([])
    }
  }, [searchText])

  useEffect(() => {
    if(error.length)
      toast.error(error, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff'
        },
      duration: 4000
      })
  }, [error])

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

  const handleEdit = (index) => {
    setIsEdit(true)
    setShowAddProject(true)
    setEditData(dataArray.filter((item, ind) => ind === index )[0])
    setEditIndex(index)
  }

  const handleDelete = (index) => {
    if(window.confirm("Are you sure to delete this row?")){
      setDataArray(dataArray.filter((item, ind) => ind !== index));
    } 
  }

  return (
   <>
    {/* Toast section */}
    <div><Toaster/></div>

    {/* Table Section */}
    <section className='w-screen h-full bg-white'>

      {/* Top section */}
      <div className='w-4/5 mt-20 mx-auto flex items-center justify-between'>
        <button onClick={() => setShowAddProject(!showAddProject)} 
          className=" px-8 py-3 bg-blue-600 text-white font-medium text-base rounded-md"
          disabled={isEdit}
        >
          Add Project
        </button>
        
        <input 
          type="text" 
          className='px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400'
          placeholder='Search...'
          onChange={(e) => setSearchText(e.target.value)}
        />

      </div>

      <div className='w-4/5 mx-auto my-10 '>
        <table className='w-full'>
          <thead className='bg-blue-500 text-white text-left'>
            <tr>
              <th className='px-2 py-3 border-r border-white' >
                Project Name
              </th>

              <th className='px-2 py-3 border-r border-white'>
                Project	Description
              </th>

              <th className='px-2 py-3 border-r border-white'>
                Skill	Set
              </th>

              <th className='px-2 py-3 border-r border-white'>
                No of Members
              </th>

              <th className='px-2 py-3 border-r border-white'>
                Is	Active?
              </th>

              <th className='px-2 py-3 border-r border-white'>
                Created At
              </th>

              <th className='px-2 py-3 border-r border-white'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>

          {filteredArray.length ? filteredArray.map((data, index) => {
            return(
              <tr key={index} className="bg-indigo-100 hover:bg-indigo-200 border border-white">
                <td className='px-2 py-3 border-r border-white'>
                  {data.name}
                </td>

                <td className='px-2 py-3 border-r border-white'>
                  {data.description}
                </td>

                <td className='px-2 py-3 border-r border-white'>
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

                <td className='px-2 py-3 border-r border-white'>
                  {data.members}
                </td>

                <td className='px-2 py-3 border-r border-white'>
                  {data.isActive ? 'Yes' : 'No'}
                </td>
                
                <td className='px-2 py-3 border-r border-white'>
                  {data.createdAt}
                </td>

                <td onClick={() => handleEdit(index)} className='px-2 py-3 border-r border-white cursor-pointer'>
                  Edit
                </td>

                <td onClick={() => handleDelete(index)} className='px-2 py-3 border-r border-white cursor-pointer'>
                  Delete
                </td>
              </tr>
            )
          }) : 
            dataArray.map((data, index) => {
              return(
                <tr key={index} className="bg-indigo-100 hover:bg-indigo-200 border border-white">
                  <td className='px-2 py-3 border-r border-white'>
                    {data.name}
                  </td>

                  <td className='px-2 py-3 border-r border-white'>
                    {data.description}
                  </td>

                  <td className='px-2 py-3 border-r border-white'>
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

                  <td className='px-2 py-3 border-r border-white'>
                    {data.members}
                  </td>

                  <td className='px-2 py-3 border-r border-white'>
                    {data.isActive ? 'Yes' : 'No'}
                  </td>
                  
                  <td className='px-2 py-3 border-r border-white'>
                    {data.createdAt}
                  </td>

                  <td onClick={() => handleEdit(index)} className='px-2 py-3 border-r border-white cursor-pointer'>
                    Edit
                  </td>

                  <td onClick={() => handleDelete(index)} className='px-2 py-3 border-r border-white cursor-pointer'>
                    Delete
                  </td>
                </tr>
              )
              })
            } 
          </tbody>
        </table>
      </div>

    </section>

    {/* Add Project Section */}
    {showAddProject &&
      <section>
        <AddProject 
          setEditData={setEditData} 
          editData={editData} 
          setIsEdit={setIsEdit} 
          isEdit={isEdit} 
          setDataArray={setDataArray} 
          dataArray={dataArray} 
          editIndex={editIndex} 
          setEditIndex={setEditIndex} 
          setShowAddProject={setShowAddProject} 
          setError={setError}
        />
      </section>
    }

   </>
  );
}

export default App;
