import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from 'react';
import 'rc-slider/assets/index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import TestPage from "./TestPage";
import HomePage from "./HomePage";
import ExplorePage from "./ExplorePage";
import StoryPage from "./StoryPage";
import {WebsocketContextProvider} from "./WebsocketProvider";


function AppNavbar(){
    return (
        <Navbar bg="light" expand="lg" className={'DebugBorder1'}>
            <Container>
                <Navbar.Brand href="/musicgroup">Music Exploration</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className={"nav-link"} to="/">Home</Link>
                        {/*<Link className={"nav-link"} to="/ExplorePage">Explore</Link>*/}
                        <Link className={"nav-link"} to="/StoryPage">Our Story</Link>
                        <a className={"nav-link"} href="https://github.com/AndiCam88/final_project">Github</a>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
function Layout() {
    var layout = (
        <div className="App">
            <Container fluid="md">
            <Row>
                <Col><AppNavbar></AppNavbar></Col>
            </Row>
                <div className={'DebugBorder1'}>
                    <Outlet />
                </div>
            </Container>
        </div>
    )
    return layout;
}

function App() {
    return (
        <div className="App">
            <WebsocketContextProvider>
            <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="ExplorePage" element={<ExplorePage />} />
                        <Route path="StoryPage" element={<StoryPage />} />
                        <Route path="TestPage" element={<TestPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            </WebsocketContextProvider>
        </div>
    );
}




export default App;
