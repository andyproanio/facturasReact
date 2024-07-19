import React, { useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';


const Header = () => {

  const [isNavOpen, setNavOpen] = useState(false)
  const toggleNav = () => setNavOpen(!isNavOpen)

  return (
    <React.Fragment>
      <Navbar dark expand="md">
        <div className="container">
          <NavbarToggler onClick={toggleNav} />
          <NavbarBrand className="mr-auto" href="/"><img src={window.location.origin + '/assets/images/logo.png'} height="30" width="57" alt='SRI' /></NavbarBrand>
          <Collapse isOpen={isNavOpen} navbar>
            <Nav navbar>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <NavItem width="50%">
                <NavLink className="nav-link" to='/'><span className="fa fa-envelope fa-lg"></span> Subir Comprobantes</NavLink>
              </NavItem>
              <NavItem width="50%">
                <NavLink className="nav-link" to='/inventario/1'><span className="fa fa-archive fa-lg"></span> Consulta por Mes</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
      <div className="jumbotron">
        <div className="container">
          <div className="row row-header">
            <div className="col-12 col-sm-6">
              <h1>Sistema de Inventario</h1>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;