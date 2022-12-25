import React from "react";
import BasicExample from "./navbar";
import { Container, Button } from "react-bootstrap";
import MyboardList from "./myboardlist";
import { Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Services/firebase-config";

function MainPage(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userid, setuserid] = useState();

    const [board_name, setboard_name] = useState('');
    const [board_descreption, setboard_descreption] = useState('');
 
    async  function addboard(){
        var path = window.location.pathname.split("/")[1];
        setuserid(path);

        const obj = {
            "board_name": board_name,
            "board_descreption": board_descreption
        };

        console.log("test1")
        await addDoc(collection(db, "user", path, "my_boards" ),obj );
        console.log("test2");

        handleClose();
    }

    function board_name_change_handler(event){
        setboard_name(event.target.value);
    }

    function board_descreption_change_handler(event){
        setboard_descreption(event.target.value);
    }

    return(
        <>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Enter Board details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
        <Form.Control  value={board_name}  onChange = {board_name_change_handler}    type="text" placeholder="Enter name" /> 
        <div className="mt-4"></div>
        <Form.Control  value={board_descreption} onChange = {board_descreption_change_handler} type="text" placeholder="Enter Description" /> 
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addboard}>Send Data</Button>
        </Modal.Footer>
      </Modal>

        <BasicExample/>

<Container>
<div className='row'>
      <div className='col-lg-5'>
      <h1>Create a Board</h1>

      <div className="text-center p-4 m-4"><Button onClick={handleShow} variant="success">
        <div className="p-3">+ Add Group</div>
        </Button>{' '}</div>
      </div>  
      
      <div className='col-lg-7'>
      <h3>My Board</h3>
         <MyboardList/>
      </div>


   </div>
</Container>
</>
    );


   
}
export default MainPage;