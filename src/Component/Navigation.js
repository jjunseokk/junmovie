import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { movieAction } from '../redux/action/movieAction';



const Navigation = () => {
    const dispatch = useDispatch();
    const search = (event) => {
            let keyword = event.target.value;
            console.log(keyword);
            if (event.key === "Enter") {
                event.preventDefault();
                dispatch(movieAction.searchMovie(keyword));
            }
    };
    
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#"><img width={100} src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png" alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        <Link to="/" className='nav-item'>Home</Link>
                        <Link to="/Movie" className='nav-item'>Movies</Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onKeyPress={(event) => search(event)} />
                        <Button variant="outline-danger">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation