import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { MdLocalHospital } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { Auth } from "aws-amplify";
import { AppContext } from "./libs/contextLib";
import { onError } from "./libs/errorLib";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";
import Routes from "./Routes";

function App() {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {

    try {
      await Auth.currentSession();
      const { attributes } = await Auth.currentAuthenticatedUser();

      setCurrentUser(attributes);
      userHasAuthenticated(true);
    } catch (e) {
      if (e != "No current user") {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);

    history.push("/login");
  }

  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              <MdLocalHospital /> Alura Med
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto">
              {isAuthenticated ? (
                <LinkContainer to="/patients">
                  <Nav.Link>
                    <FaUsers /> Pacientes
                  </Nav.Link>
                </LinkContainer>
              ) : (
                ""
              )}
            </Nav>
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <>
                  <Nav.Link onClick={handleLogout}>Sair</Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Criar uma conta</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Entrar</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <ErrorBoundary>
            <Routes />
          </ErrorBoundary>
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
