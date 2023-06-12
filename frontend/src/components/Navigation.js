import axios from "../axios";
import React, { useRef, useState } from "react";
import { Navbar, Button, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout, resetNotifications } from "../features/userSlice";
import "./Navigation.css";

function Navigation() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    

    function handleLogout() {
        dispatch(logout());
    }
    

    return (
        <Navbar bg="light" expand="lg">
            <img style={{width:"10%",height:"10%"}} src="https://i.etsystatic.com/19753085/r/il/757d03/3738603031/il_fullxfull.3738603031_pof2.jpg"/>
            <Container>
                
                <LinkContainer to="/">
                    <Navbar.Brand>RECIPE BASE</Navbar.Brand>
                    
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* if no user */}
                        {!user && (
                            <LinkContainer to="/login">
                                <Nav.Link>Login

                                </Nav.Link>
                            </LinkContainer>
                        )}
                        {user && !user.isAdmin &&(
                        <LinkContainer to = "/new-product">
                            <Nav.Link>Create Recipe</Nav.Link>
                        </LinkContainer>
                        )}
                        {user && !user.isAdmin && (
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    saved
                                    {user?.cart.count > 0 && (
                                        <span className="badge badge-warning" id="cartcount">
                                            {user.cart.count}
                                        </span>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                        )}
                        {user && (
                            <>
                                
                                <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                                    {user.isAdmin && (
                                        <>
                                            <LinkContainer to="/admin">
                                                <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/new-product">
                                                <NavDropdown.Item>Create Product</NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                                    )}
                                    

                                    <NavDropdown.Divider />
                                    <Button variant="danger" onClick={handleLogout} className="logout-btn">
                                        Logout
                                    </Button>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
            
        </Navbar>
    );
}

export default Navigation;
