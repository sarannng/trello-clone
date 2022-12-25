import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { db } from "../../Services/firebase-config";
import MyboardCard from "./board-card";
import BasicExample from "./navbar";

function Board(){

    const [uid, setuid] = useState();
    const [bid, setbid] = useState();
    const [boardname , setboardname] = useState();
    const [boarddes, setboarddes]  = useState();
    useEffect(() => {
      setdata();
}, [])
    

    async function setdata(){
        
    const uid = window.location.pathname.split('/')[1];
    const bid = window.location.pathname.split('/')[3];
    
    setuid(uid);
    setbid(bid);

    const boarddata = await getDoc(doc(db, "user", uid, "my_boards", bid));
    
    console.log(boarddata)
    setboardname(boarddata.data().board_name);
    setboarddes(boarddata.data().board_descreption);
     

    }

    return(
         <>

         
        <BasicExample/>

            <Container>
            <div> <h1>{boardname}</h1></div>
            
            <div> <h6>{boarddes }</h6></div>
            </Container>
            <br />
            <Container>
                <div className="row">
                    <div className="col-lg-1"> </div>
                    <div className="col-lg-3">
                        <MyboardCard cardheading = "Task"/>
                    </div>

                    <div className="col-lg-1"> </div>
                    <div className="col-lg-3">

                    <MyboardCard cardheading = "Inprogress"/>
                    </div>

                    <div className="col-lg-1"> </div>
                    <div className="col-lg-3">
                        
                    <MyboardCard cardheading = "Done"/>
                    </div>
                </div>
            </Container>
         </>
    );

}

export default Board;   