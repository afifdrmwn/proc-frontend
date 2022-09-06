import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import Layout from "../Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import { API_URL } from '../../utils/utils';
import $ from 'jquery';
import jwt from 'jwt-decode';
import { useHistory, BrowserRouter, useNavigate } from 'react-router-dom';
import Navbar from '../../component/Navbars';

function List(props) {
    const history = useNavigate();
    const token = localStorage.getItem('token')
    const [projectList, setProjectList] = useState([])
    const [user, setUser] = useState("")

    // const [data, setData] = useState([])
    // const [user, setUser] = useState([]);

    $.DataTable = require('datatables.net')
    const tableRef = useRef()

    useEffect(() => {
       setTimeout(() =>{
        $('#dataTable').DataTable().destroy();
        fetchProjectList()
       })
    }, [])

    useEffect(() => {
        fetchProjectList(); 
    }, [])

    useEffect(() => {
        $('#dataTable').DataTable();
    }, [projectList])



    //GET FETCH DATA NEW TAMBAH
    const fetchDataTest = async() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await axios.post(API_URL + 'login', )
        .then((response) => {  
            setUser(response.data);
            
        })
    }


    useEffect(() => {
        if(!token)
        {
            history('/dashboard');
            
        }
        fetchDataTest();
    },[]);

    //END GET FETCH DATA NEW TAMBAH
    
    // const dataSet = [
    //     ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
    //     ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
    //     ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"]
    //   ]

    // useEffect(() => {
    //     console.log(tableRef.getData)
    //     const table = $(tableRef.current).DataTable(
    //         {
    //             data :props.data,
    //             columns: [
    //                 { title: "po" },
    //                 { title: "pt" },
    //                 { title: "status" },
    //                 { title: "created_at" },
    //                 { title: "updated_at" }
    //             ],
    //             destroy: true  // I think some clean up is happening here
    //         }
    //     )
    //     // Extra step to do extra clean-up.
    //     return function () {
    //       //  setData(table.);
    //         // axios.get(API_URL + 'data')
    //         // .then(function (response) {
    //         //     setProjectList(response.data);
    //         // })
    //         // .catch(function (error) {
    //         //     console.log(error);
    //         // })


    //     }

       
    // }, [])

    const fetchProjectList = () => {
        axios.get(API_URL + 'data')
            .then(function (response) {
                const token = localStorage.getItem('jwt');
                // const user = jwt(token);
                setProjectList(response.data);
               console.log(token)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchProjectList();
    }, [])

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(API_URL + `delete/data/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Project deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchProjectList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    return (
        <>
        <Navbar />

        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Laravel Project Manager</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/create">Create New Project
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="display table table-bordered" id="dataTable" ref={tableRef}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th width="240px">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectList.map((project, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{project.pt}</td>
                                            <td>{project.po}</td>
                                            <td>
                                                <Link
                                                    to={`/show/${project.id}`}
                                                    className="btn btn-outline-info mx-1">
                                                    Show
                                                </Link>
                                                <Link
                                                    className="btn btn-outline-success mx-1"
                                                    to={`/edit/${project.id}`}>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="btn btn-outline-danger mx-1">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
        </>
    );
}

export default List;