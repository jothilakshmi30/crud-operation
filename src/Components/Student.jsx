import { useState,useEffect } from 'react';
import axios from 'axios';

function Student(){
    const[student,setStudent]=useState([]);
    const[id,setId]=useState("");
    const[name,setName]=useState("");
    const[course,setCourse]=useState("");

    useEffect(()=>{
        getStudent();
    },[])
    function getStudent(){
        axios.get("http://localhost:3000/student")
        .then((response)=>{
            setStudent(response.data);
        }).catch((error)=>{
            console.log("data not found");
        })
    }
    function addStudent(){
        axios.post("http://localhost:3000/student",{
            name:name,
            course:course
        }).then(()=>{
            getStudents();
            setName("");
            setCourse("");
        })
    }
    function editStudent(student){
        setId(student.id);
        setName(student.name);
        setCourse(student.course);
    }
    function updateStudent(){
        axios.put(`http://localhost:3000/student/${id}`,{
            id:id,
            name:name,
            course:course
        }).then(()=>{
            getStudent();
            setId("");
            setName("");
            setCourse("");
        }).catch((error)=>{
            console.log("data not updated");
        })}
        function deleteStudent(id){
            axios.delete(`http://localhost:3000/student/${id}`)
            .then(()=>{
                getStudent();
            }).catch((error)=>{
                console.log("data not required ");
            })
        
    }
    return(
        <div style={{textAlign:"center"}}>
             <h1>DSU CRUD OPERATION</h1>
             <br />
             <input type="text" placeholder="Enter name" value={name} onChange={(e)=>{
                setName(e.target.value);
             }} />
             <br /><br />
             <input type="text" placeholder="Enter course" value={course} onChange={(e)=>{
                setCourse(e.target.value);
             }}/>
             <br/><br/>
            <button onClick={addStudent}>Add data</button>
            <button onClick={updateStudent}>Update data</button>
            <br /><br />
            <table border={1} align='center' cellPadding='10' cellSpacing={10}>
             <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
             </thead>
             <tbody>
                {
                   student.map((student)=>(
                          <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.course}</td>
                            <td>
                                <button onClick={()=>editStudent(student)}>Edit</button>
                            </td>
                            <td>
                                <button  onClick={()=>deleteStudent(student.id)}>Delete</button>
                            </td>
                          </tr>
                    ))
                }
             </tbody>
            </table>
        </div>
    )
}
export default Student;