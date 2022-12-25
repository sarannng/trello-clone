import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
  return (
    <Navbar Navbar bg="dark" variant="dark">
      <Container  >
        <Navbar.Brand href="/"><div  ><h5 >Trello-clone: <div className='ml-3'>Manage your Tasks at one place</div> </h5>   </div></Navbar.Brand>
    </Container>
    </Navbar>
  );
}

export default BasicExample;