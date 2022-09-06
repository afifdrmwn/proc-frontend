// import Container from 'react-bootstrap/esm/Container';
import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import Navbars from './Navbars';
import axios from 'axios';

import {API_URL} from '../utils/utils';
//import cors from '../utils/cors';


// import { API_URL } from './utils/utils';

function Modals() { 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //pemanggilan yang ada di database
    const [po, setPo] = useState("");
    const [manager, setManager] = useState("");
    const [director, setDirector] = useState("");
    const [ceo, setCeo] = useState("");
    const [pt, setPt] = useState("");
    const [message, setMessage] = useState("");



    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let headers = new Headers();

            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
          
            headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
            headers.append('Access-Control-Allow-Credentials', 'true');
          
            headers.append('GET', 'POST', 'OPTIONS');
          let res = await fetch(API_URL + "data/create", {
            headers: headers,
            dataType: 'json',
            method: "POST",
            body: JSON.stringify({
              po: po,
              manager: manager,
              director: director,
              ceo: ceo,
              pt:pt,
            }),
        });
     
          console.log(res)
          let resJson = await res.json();
          console.log(resJson)
          if (res.status === 200) {
            setPo("");
            setManager("");
            setDirector("");
            setCeo("");
            setPt("");
            setMessage("User created successfully");
          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
      };

    
    // const saveNumberPo = async(e) => {
    //     e.preventDefault();
    //     const res = await axios.post(API_URL + '/api/data/create',this.useState);
    //     if(res.data.status === 200){
    //         console.log(res.data.message);
    //         useState = {
    //             po: '',
    //             manager: '',
    //             director: '',
    //             ceo: '',
    //             pt: ''
    //         }
    //     }
    // }

  //  this.handleSubmit = handleSubmit.bind(this);
    //this.saveNumberpo = saveNumberpo.bind(this);



    return (
        <>
            <Button variant="primary" onClick={handleShow} style={{ float: "right" }}>
                Tambah PO
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Masukkan Nomor PO</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} method="post">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nomor PO</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Hanya nomor tanpa OP"
                                autoFocus
                                name="po"
                                value={po}
                                onChange = {(e) => setPo(e.target.value)}
                            />
                        </Form.Group>
                       
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Nama Manager</Form.Label>
                            <Form.Control 
                                value={manager}
                                onChange = {(e) => setManager(e.target.value)} 
                                rows={3} 
                                placeholder="Nama Manager" 
                                name="manager" />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Nama Director</Form.Label>
                            <Form.Control 
                            rows={3} 
                            placeholder="Nama Director" 
                            name="director"
                            value={director}
                            onChange = {(e) => setDirector(e.target.value)}    
                        />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Nama CEO</Form.Label>
                            <Form.Control 
                                rows={3} 
                                placeholder="Nama ceo" 
                                name="ceo" 
                                value={ceo}
                                onChange = {(e) => setCeo(e.target.value)}
                            />
                        </Form.Group>


                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Perusahaan</Form.Label>
                            <Form.Control 
                                rows={3} 
                                placeholder="Hanya perusahaan tanpa PT"  
                                name="pt"
                                value={pt}
                                onChange = {(e) => setPt(e.target.value)}    
                            />
                        </Form.Group>

                        <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary">Simpan</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>
        </>
    );
}

function MidContent() {
    let [ posts, setPosts ] = useState([])
    useEffect(() => {
        async function getResults() {
        const results = await axios(API_URL + "data");
        setPosts(results.data)
        }
        getResults()
    },[])
    console.log(posts)
    // useEffect() {
    //     axios
    //     .get(API_URL + "data")
    //     .then((res) => {
    //         const read = res.data;
    //         console.log(read);

    //     })
    // }

    // componentDidMount() {
    //     axios
    //     .get(API_URL + "data")
    //     .then((res) => {
    //         const read = res.data;
    //         console.log(read);
    //         this.setState({ read })
    //     })
    //     .catch((error) => {
    //         console.log("error", error);
    //     });
    // }


    return (
        <>
            <Navbars />
            <Container fluid>
                <Row className="mx-auto">
                    <Col><h1>PT</h1></Col>
                    <Col><Modals /></Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>No PO</th>
                                <th>Manager</th>
                                <th>Director</th>
                                <th>CEO</th>
                                <th>Nama PT</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {posts &&
                        posts.map((post) => (
                            <tr>
                            <td>1</td>
                            <td>{post.po}</td>
                            <td>{post.manager}</td>
                            <td>{post.director}</td>
                            <td>{post.ceo}</td>
                            <td>{post.pt}</td>
                            <td> <Button variant="danger">Hapus</Button>{''}
                            <Button variant="warning">Edit</Button>{' '}</td>
                        </tr>
                        ))}
                           
                           
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    );
}

export default MidContent;