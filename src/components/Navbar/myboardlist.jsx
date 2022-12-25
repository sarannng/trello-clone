import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { db } from "../../Services/firebase-config";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


function MyboardList(){
    const [boardlist, setmyboardlist] = useState([]);
    
    useEffect(()=>{
        getboardlist();
    }, []);

    function getboardlist(){
        const user_id = window.location.pathname.split('/')[1];
          const data = onSnapshot(collection(db, 'user', user_id, "my_boards" ), snapshot =>{
            setmyboardlist(snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data()
            })))
          })
    }

    return(
         <>
           <Container>
            { boardlist.map((doc, index) =>{
                return(
                    <div className="row">
                        <div className="col-lg-12">
                        <Card>
            
              
            
            <Card.Body>
            <Card.Text>    
                <Container>
                <Card.Subtitle>{doc.data.board_name}</Card.Subtitle>
                { doc.data.board_descreption}
                </Container>
            </Card.Text>

          
             <div className="row"> 
              
             <Button   ><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to = {{
                pathname: "board-details/" + doc.id,

             }}           val = {doc.id}>Details</Link></Button>         
                </div>
 
            </Card.Body>  
                      </Card>
                        </div>
                     
                     
                <div className="mt-4" ></div>
                    </div>

                );
            })}
        
        </Container>
          </> 
    );
}   

export default MyboardList; 