import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { toast } from "react-toastify";


const EditStudent = () => {
const [student, setStudent] = useState([]);
const [loading, setLoading] = useState(true);
const [inputErrorList, setInputErrorList] = useState([]);
const {id} = useParams();
const navigate = useNavigate();

    function getFormattedDate(date) {
        return format(new Date(date), 'MMMM do, yyyy');
      }

      const handleInput = (e) =>{
        setStudent({...student, [e.target.name] : e.target.value});
      }
    
      const handleUpdate = (event) =>{
        event.preventDefault();
        setLoading(true);
        const data = {
          name: student.name,
          email: student.email,
          phone: student.phone,
          course: student.course,
        }

        axios.put(`http://127.0.0.1:8000/api/students/${id}/edit`, data).then(res=>{
        //   alert(res.data.messages);
          toast.success(res.data.messages)
          navigate("/");
          setLoading(false);
        }).catch(function(error){
            if(error.response){
                if(error.response.status === 422){
                    setInputErrorList(error.response.data.errors);
                    setLoading(false);
                }
                if(error.response.status === 404){
                    // alert(error.response.data.message);
                    toast.error(error.response.data.message);
                    setLoading(false);
                }
                if(error.response.status === 500){
                    // alert(error.response.data);
                    toast.error(error.response.data);
                    setLoading(false);
                }
            }
        })
      }
      useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/api/students/${id}/edit`).then(res=>{
          setStudent(res.data.student);
          setLoading(false);
        })
      },[id]);

      if(loading){
        return (
         <Loading />
        )
      }
      if(Object.keys(student).length === 0){
        alert(student);
        return (
        navigate('/error-403')
        )
      }
    return (
        <>
            <div className="card rounded-0 w-50 mx-auto mt-4">
                <div className="card-header rounded-0 text-white bg-secondary d-flex justify-content-between align-items-center">
                    <h3>Edit Student</h3>
                    <Link to={"/"} className="btn btn-light rounded-0">
                        Back
                    </Link>
                </div>
                <div className="card-body">
                    <form onSubmit={handleUpdate} action="" method="post">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control rounded-0"
                                        id="name"
                                        name="name"
                                        onChange={handleInput}
                                        value={student.name}
                                    />
                                    <div className="text-danger">{inputErrorList.name}</div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control rounded-0"
                                        id="email"
                                        name="email"
                                        onChange={handleInput}
                                        value={student.email}
                                    />
                                     <div className="text-danger">{inputErrorList.email}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="mb-3">
                                    <label htmlFor="course" className="form-label">
                                        Course
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control rounded-0"
                                        id="course"
                                        name="course"
                                        onChange={handleInput}
                                        value={student.course}
                                    />
                                     <div className="text-danger">{inputErrorList.course}</div>
                                </div>
                                </div>
                                <div className="col-lg-6">
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">
                                        Phone
                                    </label>
                                    <input
                                        className="form-control rounded-0"
                                        id="phone"
                                        name="phone"
                                        onChange={handleInput}
                                        value={student.phone}
                                    />
                                     <div className="text-danger">{inputErrorList.phone}</div>
                                </div>
                                </div>
                                <div className="col-lg-6">
                                <div className="mb-3">
                                   <button type="submit" className="btn btn-success rounded-0">Update</button>
                                </div>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditStudent;
