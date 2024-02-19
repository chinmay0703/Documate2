import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import Nav from '../routes/Nav';
import Footer from '../routes/Footer';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "@blocknote/react/style.css";

function Dashboard() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('center');
  const [formdata, setFormadata] = useState({});
  const [notes, setNotes] = useState([]);
  const [notename, setNotename] = useState('');
  const [yesdelete, setYesdelete] = useState(false);
  const [noteslength, setNoteslength] = useState(0);
  const [notetext, setNotetext] = useState(null);
  const navigate = useNavigate();
  const [tokenpresnet, setTokenpresent] = useState(false);
  const toast = useRef(null);
  const [modal, setModal] = useState(false);
  const [deleteid, setDeleteid] = useState('');

  const toggle = () => setModal(!modal);

  const togglee = (id) => {
    setDeleteid(id);
    toggle();
  }
  const togg = () => {
    setModal(!modal);
    handleDelete();
  }

  const showSuccess = (errorDetail) => {
    toast.current.show({ severity: 'success', summary: 'Congrats', detail: errorDetail, life: 3000 });
  }
  const showInfo = (errorDetail) => {
    toast.current.show({ severity: 'info', summary: 'Info', detail: errorDetail, life: 3000 });
  }
  const showError = (errorDetail) => {
    toast.current.show({ severity: 'error', summary: 'Deleted', detail: errorDetail, life: 3000 });
  }
  useEffect(() => {
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
        setNotes(response.data.user.notes);
        // setNoteslength(response.data.user.notes.length);
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



  const savedatatodbd = async (e) => {
    e.preventDefault();

    if (!notename) {
      showError('Please Enter Note name ');
      return;
    }
    const userEmail = formdata.email;
    const formdataa = {
      notename,
      email: userEmail,
    };
    try {
      console.log(notetext);
      const response = await axios.post('http://localhost:3001/addnotename', formdataa);
      console.log(response.data);
      showSuccess(`New note creating by name ${notename}`);
      setTimeout(function () {
        navigate('/addnote', { state: { notename } });
      }, 1000);

    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error ? error.response.data.error.message : 'Note allready created with this name';
        showError(errorMessage);
      } else if (error.request) {
        showError('No response received');
      } else {
        showError(error.message);
      }
    }
  };

  const show = (position) => {
    const token = localStorage.getItem('Token');
    if (!token) {
      showError("Please Login to create a note")
      setVisible(false);
      return;
    }
    setPosition(position);
    setVisible(true);
  };
  const footerContent = (
    <div>
      <Button label="Cancel" severity="danger" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
      <Button label="Save" severity="info" icon="pi pi-check" onClick={savedatatodbd} autoFocus />
    </div>
  );
  useEffect(() => {
    console.log(JSON.stringify(notetext, null, 2));
  }, [notetext]);



  const handleEdit = async (id) => {
    navigate('/editnote', { state: { id } });
  }
  function truncateText(text, wordCount) {
    if (text.length > 50) {

      var str = ''
      for (let i = 0; i < 8; i++) {
        str = str + text[i];
      }
      return str + '...';;

    }
    const words = text.split(' ');
    if (words.length > wordCount) {
      const truncatedText = words.slice(0, wordCount).join(' ') + ' .....';
      return truncatedText;
    } else {
      return text;
    }
  }

  const handleDelete = async () => {
    try {
      const formdataa = {
        noteid: deleteid,
        userid: formdata._id,
      };
      console.log(formdataa);
      const response = await axios.post("http://localhost:3001/deletenote", formdataa);
      console.log(response.data);
      showError("Note Deleted");
      refreshuser();
    } catch (error) {
      console.error("Error deleting note:", error);
    }

  };
  return (
    <div>
      <Toast ref={toast} />
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Warning</ModalHeader>
          <ModalBody>
            Are You sure you want to delete
          </ModalBody>
          <ModalFooter>
            <Button severity="info" onClick={toggle}>
              Cancel
            </Button>
            <Button severity="danger" onClick={togg}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </div>
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
        <div className="card">
          <div className="flex flex-wrap justify-content-start mx-3 my-3 ">
            <Button label="" icon="pi pi-plus" onClick={() => show('top')} ></Button><h5 className="my-2 mx-3">Create A Note</h5 >
          </div>

          <Dialog header="Create a Note" visible={visible} position={position} style={{ width: '70vw' }} onHide={() => setVisible(false)} footer={footerContent} draggable={false} resizable={false}>
            <div className="col-sm-12 col-lg-12">
              <div className="form-group">
                <label htmlFor="note" className=''>Note Name</label>
                <InputText
                  id="note"
                  onChange={(e) => setNotename(e.target.value)}
                  className="col-sm-12 col-lg-12 my-3"
                  placeholder="Enter Note Name"
                />
              </div>
            </div>
          </Dialog>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          {notes.map((note, index) => (
            <div className='col-sm-12 col-md-6 col-lg-4 my-3' key={note._id}>
              <div className='card sdd bg-light shadow p-3 mb-5 bg-white rounded'>
                <div className='card-header'>
                  <h5 className='text-center'>{note.notename}</h5>
                </div>
                <div className='card-body'>
                  {/* <p className='card-text'>{truncateText(note.notetext,6)}</p> */}
                </div>
                <div className='card-footer my-4'>
                  <Button severity='info' onClick={() => handleEdit(note._id)} className='my-2'>Edit</Button>
                  <Button onClick={() => togglee(note._id)} severity='danger' className='justify-content-end align-items-end mx-2 my-2'>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <Footer></Footer> */}
    </div >
  );
}
export default Dashboard;
