import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { format } from 'date-fns';
import Loading from '../components/Loading';


const Student = () => {
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
    function getFormattedDate(date) {
      return format(new Date(date), 'MMMM do, yyyy');
    }
    useEffect(()=>{
      axios.get('http://127.0.0.1:8000/api/students').then(res=>{
        setStudent(res.data.students);
        setLoading(false);
      })
    },[]);

    const handleDelete = (e,id) =>{
      e.preventDefault();
      const thisClicked = e.currentTarget;
      thisClicked.innerText = "Deleting...";
      axios.delete(`http://127.0.0.1:8000/api/students/${id}/delete`).then(res=>{
        // toast.success(res.data.messages);
        thisClicked.closest('tr').remove();
      }).catch(function(error){
        if(error.response){
          if(error.response.status === 404){
            toast.warning(res.data.messages);
          }
        }
      })
    }

    if(loading){
      return (
       <Loading />
      )
    }

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Student List</h3>
          <Link to={'/add-student'} className="btn btn-success rounded-0">Add Student</Link>
        </div>
      <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Course</th>
                    <th>Phone</th>
                    <th>Created At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                 {
                  student.map((stu, index)=>{
                    return (
                      <>
                    <tr key={index}>
                        <td>{stu.id}</td>
                        <td>{stu.name}</td>
                        <td>{stu.email}</td>
                        <td>{stu.course}</td>
                        <td>{stu.phone}</td>
                        <td>{getFormattedDate(stu.created_at)}</td>
                        <td>
                            <Link to={`/student/${stu.id}/edit`} className="btn btn-primary btn-sm rounded-0">Edit</Link>
                            <button onClick={(e)=>{handleDelete(e, stu.id)}} className="btn btn-danger btn-sm rounded-0 mx-2">Delete</button>
                            <Link className='btn btn-warning btn-sm rounded-0' to={`student/${stu.id}`}>View</Link>
                        </td>
                    </tr>
                      </>
                    )
                  })
                 }
            </tbody>
       </table>
      </div>
    </>
  )
}

export default Student
