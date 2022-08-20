// import Container from 'react-bootstrap/esm/Container';
import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import Navbars from './Navbars';
import axios from 'axios';
import { API_URL } from './utils/utils';

function Modals() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nomor PO</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Hanya nomor tanpa OP"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Perusahaan</Form.Label>
                            <Form.Control rows={3} placeholder="Hanya perusahaan tanpa PT" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function MidContent() {
    // useEffect() {
    //     axios
    //     .get(API_URL + "data")
    //     .then((res) => {
    //         const read = res.data;
    //         console.log(read);

    //     })
    // }
    componentDidMount() {
        axios
        .get(API_URL + "data")
        .then((res) => {
            const read = res.data;
            console.log(read);
            this.setState({ read })
        })
        .catch((error) => {
            console.log("error", error);
        });
    }

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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>22002211</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td><Button><i class="bi bi-check-square"></i></Button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>22002323</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>22005151</td>
                                <td>Jacob</td>
                                <td>Thorntonss</td>
                                <td>@fataq</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </>
    );
}

export default MidContent;