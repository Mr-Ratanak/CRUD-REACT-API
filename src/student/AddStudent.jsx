import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const AddStudent = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [inputErrorList, setInputErrorList] = useState([]);
    const [student, setStudent] = useState({
        name: '',
        email: '',
        phone: '',
        course: '',
    });


    const handleInput = (e) => {
        e.persist();
        setStudent({...student, [e.target.name] : e.target.value});
    };

    const handleSave = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name: student.name,
            email: student.email,
            phone: student.phone,
            course: student.course,
        }

        axios.post("http://127.0.0.1:8000/api/add-students", data)
            .then((res) => {
                toast.success(res.data.messages)
                navigate("/");
                setLoading(false);
            }).catch(function(error){
                if(error.response){
                    if(error.response.status === 422){
                        setInputErrorList(error.response.data.errors);
                        setLoading(false);
                    }
                    if(error.response.status === 500){
                        toast.error(error.response.data.messages);
                        setLoading(false);
                    }
                }
            })
    };
    
    if(loading){
        return(
            <Loading />
        )
    }

    return (
        <>
            <div className="card rounded-0 w-50 mx-auto mt-4">
                <div className="card-header rounded-0 text-white bg-secondary d-flex justify-content-between align-items-center">
                    <h3>Add Student</h3>
                    <Link to={"/"} className="btn btn-light rounded-0">
                        Back
                    </Link>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSave} action="" method="post">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="">
                                    <label htmlFor="name" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control rounded-0"
                                        value={student.name}
                                        id="name"
                                        name="name"
                                        onChange={handleInput}
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
                                        value={student.email}
                                        id="email"
                                        name="email"
                                        onChange={handleInput}
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
                                        value={student.course}
                                        id="course"
                                        name="course"
                                        onChange={handleInput}
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
                                        value={student.phone}
                                        id="phone"
                                        name="phone"
                                        onChange={handleInput}
                                    />
                                    <div className="text-danger">{inputErrorList.phone}</div>
                                </div>
                                </div>
                                <div className="col-lg-6">
                                    <button type="submit" className="btn btn-primary rounded-0">Add New</button>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddStudent;
