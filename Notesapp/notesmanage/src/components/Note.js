import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import Nav from '../routes/Nav';
import Footer from '../routes/Footer';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import SaveIcon from '@mui/icons-material/Save';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Tooltip } from 'reactstrap';

function Note() {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const [formdata, setFormadata] = useState({});
    const [notetext, setNotetext] = useState(null);
    const location = useLocation();
    const [namenote, setNamenote] = useState(location.state.notename);
    const navigate = useNavigate();
    // console.log(location);
    const [tokenpresnet, setTokenpresent] = useState(false);
    const toast = useRef(null);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
    const showSuccess = (errorDetail) => {
        toast.current.show({ severity: 'success', summary: 'Congrats', detail: errorDetail, life: 3000 });
    }
    const showInfo = (errorDetail) => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: errorDetail, life: 3000 });
    }
    const showError = (errorDetail) => {
        toast.current.show({ severity: 'error', summary: 'Try again', detail: errorDetail, life: 3000 });
    }
    useEffect(() => {
        // console.log(namenote)
        refreshuser();
    }, []);
    const refreshuser = () => {

        const token = localStorage.getItem('Token');
        if (token) {
            setTokenpresent(true);
        }
        axios
            .post('http://localhost:3001/validateToken', { token })
            .then((response) => {
                setFormadata(response.data.user);
                console.log('Response:', response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleNavbarToggle = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const handleNavbarClose = () => {
        if (isNavbarOpen) {
            setIsNavbarOpen(false);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('Token');
        navigate("/");
    };

    const editor = useBlockNote({
        onEditorContentChange: (editor) =>
            setNotetext(editor.topLevelBlocks)
    });

    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(notetext);
        const useremail = formdata.email;
        const formdataa = {
            notetext,
            email: useremail,
            namenote,
        };
        try {
            const response = await axios.post('http://localhost:3001/sendnote', formdataa);
            console.log(response.data);
            showSuccess("Note Created Successffully");
            navigate("/dashboard")
        } catch (error) {
            if (error.response) {
                showError(`${error.response.data.error}`);
            } else if (error.request) {
                showError('No response received');
            } else {
                showError(error.message);
            }
        }
    }

    // useEffect(() => {
    //     console.log(JSON.stringify(notetext, null, 2));
    // }, [notetext]);

    return (
        <div>
            <Toast ref={toast} />
            <div className="signupback">
                <nav className="navbar navbar-expand-lg signupback  bg-white container">
                    <div className="container-fluid ">
                        <Link to="/" className="navbar-brand titlee text-white " onClick={handleNavbarClose}>
                            Documate
                        </Link>
                        <button
                            className={`navbar-toggler ${isNavbarOpen ? 'navbar-toggler-open' : ''}`}
                            type="button"
                            data-bs-target="#navbarSupportedContent"
                            style={{ color: 'white', backgroundColor: 'lightblue' }}
                            onClick={handleNavbarToggle}
                            aria-controls="navbarSupportedContent"
                            aria-expanded={isNavbarOpen}
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-end">

                                <li className="nav-item text-start">
                                    <Link to="/Aboutus" className=" nav-link active text-white" onClick={handleNavbarClose}>
                                        About us
                                    </Link>
                                </li>
                                <li className="nav-item text-start">
                                    <Link to="/Features" className="  nav-link active text-white" onClick={handleNavbarClose}>
                                        Features
                                    </Link>
                                </li>
                                <li className="nav-item text-start">
                                    <Link to="/contactus" className=" nav-link active text-white" onClick={handleNavbarClose}>
                                        Contact us
                                    </Link>
                                </li>
                            </ul>
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {tokenpresnet ? (
                                    <li style={{ display: 'flex', alignItems: 'center' }}>
                                        <p className="text-white" style={{ marginRight: '10px' }}>User:{formdata.name}</p>
                                        <Link to="/">
                                            <Button severity="danger" className="mx-1" onClick={handleLogout}>Logout</Button>
                                        </Link>
                                    </li>
                                ) : (
                                    <>
                                        <li style={{ display: 'flex', alignItems: 'center' }}>
                                            <Link to="/login">
                                                <Button severity="info" className="mx-1">Login</Button>
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div>
                <div className='row'>
                    <div className='col-12 my-2'>
                        <h3 className='text-center'>Note Name:{namenote}</h3>
                    </div>
                </div>
                <div className="container">
                    <ui>
                        {/* <Button className='mx-3' onClick={handlesubmit}>Submit</Button>
                            <Link to="/dashboard"><Button severity="info" className="mx-1">create new</Button></Link> */}
                        <AddBoxIcon ></AddBoxIcon>
                        <SaveIcon
                            id="TooltipExample"
                            onMouseEnter={toggleTooltip}
                            onMouseLeave={toggleTooltip}
                            onClick={handlesubmit}
                        />
                        <Tooltip
                            isOpen={tooltipOpen}
                            target="TooltipExample"
                            toggle={toggleTooltip}
                        >
                            Save
                        </Tooltip>
                    </ui>
                    <div className="notepa-container">
                        <div className="justify-content-start mx-3 my-3 notepad-bock">
                            <div className="">
                                <BlockNoteView editor={editor} theme={"light"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Note;
