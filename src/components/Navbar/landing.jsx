import React from "react";
import { Button, Container } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Services/firebase-config";
import { useAsyncError } from "react-router-dom";
import { Link } from "react-router-dom";


function LandingPage(){
   
  const [id, setid] = useState();
  const [newid, setnewid] = useState(); 
  
  async  function createuserid(){
        const id =   (await addDoc(collection(db, "user"), {})).id;
        console.log(id)
        setnewid(id);
    }

    function movetonextpage(){

    }

    return(
        <>  
        <Container>
        
        <div className="text-center"> <img width={200} height={200} src="https://i.kym-cdn.com/entries/icons/square/000/016/042/Wait-For-It.jpg"  /></div>
         <Form.Group className="mb-3"  >
         
         
         <Form.Label>Your ID</Form.Label>
        
        <div className="text-center">
        <div className="row">
            <div className="col-lg-5" >
            <Form.Control value={id}    type="text" placeholder="Enter name" /> 
         
            </div>

            <div className="col-lg-3">
                 <Link to = {{
                pathname: "/" + newid,

             }} >
       <Button   variant="success"  >
        Get in
       </Button>
       </Link>
          </div>

        </div>
        </div>
          
       </Form.Group>
        


       <div className="text-center"> 
       <div><h4>OR</h4></div>
       <Button onClick={createuserid}> Start the journey by creating a new ID</Button>
        </div>

         <div className="text-center mt-4"><h4> {newid}</h4></div>
        </Container>
        </>
    );
}

export default LandingPage;