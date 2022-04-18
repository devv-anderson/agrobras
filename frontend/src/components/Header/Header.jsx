import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import './Header.css'

import { logout } from './../../actions/userActions'

const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <Navbar collapseOnSelect expand="lg" fixed="top">
            <LinkContainer to="/">
                <Navbar.Brand className="nav-cal" >
                    <Image width="90px"src="/agrobras.jpg" />
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto ">
                    <LinkContainer to="/">
                        <Nav.Link className="nav-cal">INICIO</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/farmer">
                        <Nav.Link className="nav-cal">AGRICULTOR</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/consumer">
                        <Nav.Link className="nav-cal">CONSUMIDOR</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="login?redirect=supplier">
                        <Nav.Link className="nav-cal">VENDEDOR</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/cart" >
                        <Nav.Link className={`${userInfo ? "remove-space" : "add-space cart nav-cal"} `}>
                            <i className="fas fa-shopping-cart"></i>
                            CARRINHO
                        </Nav.Link>
                    </LinkContainer>
                    {
                        userInfo ? (
                            <NavDropdown title={userInfo.name.toUpperCase()} id='username'>
                                {
                                    userInfo && userInfo.isAdmin && (
                                        <LinkContainer to='/admin/dashboard'>
                                            <NavDropdown.Item>DASHBOARD</NavDropdown.Item>
                                        </LinkContainer>
                                    )
                                }
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>PERFIL</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/login'>
                                    <NavDropdown.Item onClick={logoutHandler}>SAIR</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link className="login nav-cal">ENTRAR</Nav.Link>
                                </LinkContainer>
                            )
                    }
                    {
                        userInfo && userInfo.isAdmin && (
                            <NavDropdown title="ADMIN" id='adminmenu'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>USUARIOS</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>PRODUTOS</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>PEDIDOS</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
