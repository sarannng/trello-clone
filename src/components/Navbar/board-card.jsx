import { getDefaultAppConfig } from "@firebase/util";
import { addDoc, deleteDoc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../Services/firebase-config";
import { collection, doc } from "firebase/firestore";
import { Button, Card, Container, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import BasicExample from "./navbar";
function MyboardCard(props){

    const [carddata, setcarddata] = useState([]);
    const [item, setitem] = useState();
    const [show, setShow] = useState(false);
    const [uid, setuid] = useState();
    const [bid, setbid] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        getData();
    }, []);

    async function getData(){
        const uid = window.location.pathname.split('/')[1];
        const bid = window.location.pathname.split('/')[3];
        setuid(uid);
        setbid(bid);
        const propitem = props.cardheading;

         console.log(propitem);
         console.log(uid);
         console.log(bid);
         if(propitem === "Task"){
            const data = await onSnapshot(collection(db, 'user', uid, "my_boards", bid, "tasks" ), snapshot =>{
                setcarddata(snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data()
                })))
              })
         }
         
         else if(propitem === "Inprogress"){
            const data = await onSnapshot(collection(db, 'user', uid, "my_boards", bid, "inprogress" ), snapshot =>{
                setcarddata(snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data()
                })))
              })
         }

         else{
            const data = await onSnapshot(collection(db, 'user', uid, "my_boards", bid, "done" ), snapshot =>{
                setcarddata(snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data()
                })))
              })
         }
    }


    function itemhandler(event){
        setitem(event.target.value);
    }

    async function addItem(){
        if(props.cardheading === "Task"){
            const obj = {
                "item": item
            }
            await addDoc(collection(db, "user", uid, "my_boards", bid, "tasks" ), obj);
        }

       else if(props.cardheading === "Inprogress"){
            const obj = {
                "item": item
            }
            await addDoc(collection(db, "user", uid, "my_boards", bid, "inprogress" ), obj);
        }

        else {
            const obj = {
                "item": item
            }
            await addDoc(collection(db, "user", uid, "my_boards", bid, "done" ), obj);
        }
    }

 async   function movefunction(cardsid){
        console.log(cardsid);
        console.log("clicked")

        if(props.cardheading === "Task"){
 

        const item_to_move =   await getDoc(doc(db, "user", uid, "my_boards", bid, "tasks", cardsid ));
        await addDoc(collection(db, "user", uid, "my_boards", bid, "inprogress"), item_to_move.data());

        await deleteDoc(doc(db, "user", uid, "my_boards", bid, "tasks", cardsid ));
            
    }

       else if(props.cardheading === "Inprogress"){
           
        const item_to_move =   await getDoc(doc(db, "user", uid, "my_boards", bid, "inprogress", cardsid ));
        await addDoc(collection(db, "user", uid, "my_boards", bid, "done"), item_to_move.data());

        await deleteDoc(doc(db, "user", uid, "my_boards", bid, "inprogress", cardsid ));
        }

        else {
            
         
        await deleteDoc(doc(db, "user", uid, "my_boards", bid, "done", cardsid ));
        }



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
          <Modal.Title>Enter Board details {props.cardheading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
        <Form.Control  value={item}  onChange = {itemhandler}    type="text" placeholder="Enter name" /> 
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addItem}>Send Data</Button>
        </Modal.Footer>
      </Modal>


          <Container>
          <Card.Header><Card.Title>{props.cardheading} <div className="my-3 text-center"> 
              
              <Button  onClick={handleShow} > +Add Task</Button>         
                 </div></Card.Title> 
          </Card.Header>
            {carddata.map((doc, index) =>{
                return(
                    <div className="row">
                        <div className="col-lg-12">
                        <Card>
            
          
             
            <Card.Body>
            <Card.Text>    
                <Container>
                <Card.Subtitle>{doc.data.item}</Card.Subtitle>
                {/* {doc.data.item} */}
                </Container>
            </Card.Text>
 
                 
            
            </Card.Body>  

            <div className="text-center pb-2">
                        
                        <Button variant="danger" onClick={ ()=> movefunction(doc.id)  }><h6>Move</h6></Button>
                                </div>
                      </Card>
                      
        
        <div className="mt-3"></div>
                        </div>

                         
                     
                    
                    </div>


                );
            })}
        </Container>
        {/* <div className=" pt-4 text-center"> 
              
              <Button  onClick={handleShow} > +Add Task</Button>         
                 </div> */}
        </>
    ); 
}

export default MyboardCard;