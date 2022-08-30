import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Layout from "../Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import { API_URL } from '../../utils/utils';
import { PopoverHeader } from 'react-bootstrap';
 
function Create() {
    const [po, setPo] = useState('');
    const [pt, setPt] = useState('')
    const [isSaving, setIsSaving] = useState("")
    const [status, setStatus] = useState('')
 
    const handleSave = () => {
        setIsSaving(true);
        axios.post(API_URL +'data/create', {
            po: po,
            pt: pt,
            status: status
          })
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Project saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            setPo('')
            setPt('')
            setStatus('')
          })
          .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
          });
    }
 
    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Create New Project</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/">View All Projects
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">PO Number</label>
                                <input 
                                    onChange={(event)=>{setPo(event.target.value)}}
                                    value={po}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="po"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">PT</label>
                                <textarea 
                                    value={pt}
                                    onChange={(event)=>{setPt(event.target.value)}}
                                    className="form-control"
                                    id="description"
                                    rows="3"
                                    name="pt"></textarea>

                                    <input 
                                    onChange={(event)=>{setStatus(event.target.value)}}
                                    value={status}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="status"/>
                            </div>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="submit"
                                className="btn btn-outline-primary mt-3">
                                Save Project
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
 
export default Create;