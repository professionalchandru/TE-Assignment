import React, {useEffect, useState} from 'react'
// import { Button, Form } from 'react-bootstrap'

import Select from 'react-select'

const AddProject = ({setDataArray, dataArray, setShowAddProject, setError, setEditData, editData, setIsEdit, isEdit, editIndex, setEditIndex}) => {

    const options = [
        { value: 'reactjs', label: 'React Js' },
        { value: 'nodejs', label: 'Node Js' },
        { value: 'gatsbyjs', label: 'Gatsby Js' },
        { value: 'mongodb', label: 'Mongo DB' },
      ]

    const [name, setName] =useState('');
    const [desc, setDesc] =useState('');
    const [skills, setSkills] =useState([]);
    const [member, setMember] =useState(0);
    const [isActive, setIsActive] =useState(false);

    useEffect(() => {
        setName(editData.name)
        setDesc(editData.description)
        setMember(editData.members)
        setIsActive(editData.isActive)

    }, [isEdit])

    const handleSubmit = (e) => {
        e.preventDefault();

        let newSkills = []
        skills.map((item) => newSkills.push(item.label))


        // Validating phase
        let validateExp = /^([a-zA-Z0-9_]){2,30}$/
        if(!validateExp.test(name)){
            setError('Name should contains only letters, numbers, and _  ')
            console.log('Name should contains only letters, numbers, and _  ')
            return;
        }

        if(!isEdit && newSkills.length === 0) {
            setError('Atleast one skill should be selected ')
            console.log('Atleast one skill should be selected')
            return;
        }
        let obj;

        if(isEdit){

            obj = {
                name: name,
                description: desc,
                skill: editData.skill,
                members: member,
                isActive: isActive,
                createdAt: new Date().toLocaleString()
            }
        }else {
            obj = {
                name: name,
                description: desc,
                skill: newSkills,
                members: member,
                isActive: isActive,
                createdAt: new Date().toLocaleString()
            }
        } 


        if(isEdit) {
            let newDataArray = [...dataArray];
            newDataArray[editIndex] = obj;
            setDataArray(newDataArray);
            setEditIndex(-1)
            setEditData({})
        } else {
            setDataArray((state) => [...state, obj ]);
        }
        
        setShowAddProject(false)
        setIsEdit(false)
        setError('')
    }

    const handleMultiChange = (event) => {
        setSkills(event)
      }

    const handleReset = () => {
        setShowAddProject(false);
        setEditData({}); 
        setIsEdit(false);
    }

  return (
      <>
        {/* Add Project Component */}
        <div className='w-4/5 mx-auto py-10 '>
            
            <h1 className='text-3xl py-5 text-center text-black font-medium'>
                {isEdit ? 'Edit Project' : 'Add Project'}
            </h1>


            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col space-y-5">
                <TextInput 
                    type="text" 
                    placeholder="Enter Name *" 
                    value={name} 
                    required={true} 
                    onChange={ (e) => setName(e.target.value) }
                />

                <TextInput 
                    type="text" 
                    placeholder="Enter Description" 
                    value={desc} 
                    required={false} 
                    onChange={ (e) => setDesc(e.target.value) }
                />

                <Select options={options} isMulti
                    onChange={(e) => handleMultiChange(e)}
                    value={skills}
                    styles={{width: '50%'}}
                    isDisabled={isEdit}
                />

                <select 
                    className=" w-full px-3 py-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 focus:bg-white"
                    value={member} 
                    onChange={ (e) => setMember(e.target.value) }
                >
                    <option>No of Members</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5 or 5+</option>
                </select>

                <div className='inline-flex items-center space-x-5'>
                    <input type="checkbox" className='w-5 h-5' name='check' id='check' checked={isActive} onChange={ (e) => setIsActive(!isActive) } />
                    <label htmlFor="check" className='text-lg text-black font-normal'>Is Active</label>
                </div>

                <div className='flex flex-row items-center space-x-5'>
                    <button type='submit'
                        className=" px-8 py-3 bg-blue-600 text-white font-medium text-base rounded-md"
                        >
                        Save
                    </button>

                    <button type='reset' 
                        className=" px-8 py-3 bg-gray-500 text-white font-medium text-base rounded-md"
                        onClick={() => handleReset()}
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>

      </>
  )

    // Add Project Component
    // <div className='container' >
    //     <Form onSubmit={(e) => handleSubmit(e)}>
    //         <Form.Group className="mb-3" controlId="formBasicEmail">
    //             <Form.Label>Project Name <span style={{color: 'red'}}>*</span></Form.Label>
    //             <Form.Control type="text" placeholder="Enter Name" value={name} required={true} onChange={ (e) => setName(e.target.value) } />
    //         </Form.Group>

    //         <Form.Group className="mb-3" controlId="formBasicPassword">
    //             <Form.Label>Project Description</Form.Label>
    //             <Form.Control type="text" placeholder="Enter Description" value={desc} onChange={ (e) => setDesc(e.target.value) } />
    //         </Form.Group>

    //         <Select options={options} isMulti classNamePrefix='Skill set'
    //             onChange={(e) => handleMultiChange(e)}
    //             value={skills}
    //         />

    //         <Form.Select className='mt-3 mb-3' aria-label="Default select example" 
    //             value={member} onChange={ (e) => setMember(e.target.value) }
    //         >
    //             <option>No of Members</option>
    //             <option value="1">1</option>
    //             <option value="2">2</option>
    //             <option value="3">3</option>
    //             <option value="4">4</option>
    //             <option value="5">5 or 5+</option>
    //         </Form.Select>

    //         <Form.Group className="mt-3 mb-3" controlId="formBasicCheckbox">
    //             <Form.Check type="checkbox" label="Is Active" 
    //                 value={isActive} onChange={ (e) => setIsActive(!isActive) }
    //             />
    //         </Form.Group>

    //         <Button variant="primary" type="submit">
    //             Submit
    //         </Button>
    //     </Form>
    // </div>
}

const TextInput = ({type, placeholder, value, onChange, required}) => {
    return(
        <>
            <input required={required} type={type} placeholder={placeholder} value={value} onChange={onChange} className=" w-full px-3 py-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 focus:bg-white"  />
        </>
    )
}

export default AddProject