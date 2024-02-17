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

function Editnote() {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');
    const [notename, setNotename] = useState('');
    const [notes, setNotes] = useState([]);
    const [formdata, setFormadata] = useState({});
    const [notetext, setNotetext] = useState(null);
    const [noteid, setNoteid] = useState('');
    const navigate = useNavigate();
    const [tokenpresnet, setTokenpresent] = useState(false);
    const toast = useRef(null);
    const showSuccess = (errorDetail) => {
        toast.current.show({ severity: 'success', summary: 'Congrats', detail: errorDetail, life: 3000 });
    }
    const showInfo = (errorDetail) => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: errorDetail, life: 3000 });
    }
    const showError = (errorDetail) => {
        toast.current.show({ severity: 'error', summary: 'Try again', detail: errorDetail, life: 3000 });
    }
    const notefind = () => {
        const selectedNote = notes.find((note) => note._id === noteid);
        if (selectedNote) {
            const { title, paragraphs } = selectedNote;
            setNotename(title);
            
            setNotetext(paragraphs);
            console.log('Found note:', selectedNote);
            console.log('notename:', title);
            console.log('notetext:', paragraphs);
        } else {
            console.warn('Note not found for noteid:', noteid);
        }
    };


    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.id) {
            setNoteid(location.state.id);
        }
    }, [location.state]);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Note ID:", noteid);
            await refreshuser();
        };
        fetchData();
    }, [noteid]);

    useEffect(() => {
        notefind();
    }, [notes]);

    const refreshuser = () => {
        const token = localStorage.getItem('Token');
        if (token) {
            setTokenpresent(true);
        }
        axios
            .post('http://localhost:3001/validateToken', { token })
            .then((response) => {
                setFormadata(response.data.user);
                setNotes(response.data.user.notes);
                // console.log('Response:', response.data);
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
        const useremail = formdata.email;
        const formdataa = {
            notetext,
            email: useremail,
            notename,
            noteid,
        };
        try {
            console.log(notetext);
            const response = await axios.post('http://localhost:3001/update', formdataa);
            console.log(response.data);
            showSuccess("Note Updated Successffully");
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
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

    useEffect(() => {
        // console.log(JSON.stringify(notetext, null, 2));
    }, [notetext]);

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
                <div className='container container-fluid'>
                    <div className='row'>
                        {/* <div className='col-12 my-2'>
                                <input className='text-center' value={notename}></input>
                        <h3 className='text-center'>Note Name:{notename}</h3>
                    </div> */}

                        <div className="form-group container  mx-5">
                            <label htmlFor="note" className='text-center'>Note Name:</label>
                            <InputText
                                id="note"
                                value={notename}
                                onChange={(e) => setNotename(e.target.value)}
                                className="col-sm-12 col-lg-8 my-3"
                                placeholder="Enter Note Name"
                            />
                        </div>

                    </div>
                    <div className="container my-5">
                        <div className="notepad">
                            <ui>
                                <Button className='mx-3' onClick={handlesubmit}>Update</Button>

                            </ui>
                            <div className="justify-content-start mx-3 my-3 note">
                                
                                <div className="">
                                    <BlockNoteView editor={editor} value={notetext} theme={"light"} />
                                </div>

                                {/* <textarea
                                    value={notetext}
                                    onChange={(e) => setNotetext(e.target.value)} className='w-100 h-100'></textarea> */}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Editnote;
