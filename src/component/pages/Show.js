import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../Layout"
import axios from 'axios';
import { API_URL } from '../../utils/utils';
 
function Show() {
    const [id, setId] = useState(useParams().id)
    const [project, setProject] = useState({po:'', pt:''})
    useEffect(() => {
        axios.get(API_URL + `show/${id}`)
        .then(function (response) {
          setProject(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })

        console.log('id')
    }, [])
 
    return (
        <Layout>
           <div className="container">
            <h2 className="text-center mt-5 mb-3">Show Project</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/"> View All Projects
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Name:</b>
                        <p>{project.po}</p>
                        <b className="text-muted">Description:</b>
                        <p>{project.pt}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
 
export default Show;