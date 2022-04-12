import React, {useState} from 'react'
// import { Button, Form } from 'react-bootstrap'

import Select from 'react-select'

const AddProject = ({setDataArray, setShowAddProject, setError}) => {

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

        if(newSkills.length === 0) {
            setError('Atleast one skill should be selected ')
            console.log('Atleast one skill should be selected')
            return;
        }

        let obj = {
            name: name,
            description: desc,
            skill: newSkills,
            members: member,
            isActive: isActive,
            createdAt: new Date().toLocaleString()
        }
        
        setDataArray((state) => [...state, obj ]);
        setShowAddProject(false)
        setError('')
    }

    const handleMultiChange = (event) => {
        setSkills(event)
      }

  return (
      <>
      </>

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
  )
}

export default AddProject