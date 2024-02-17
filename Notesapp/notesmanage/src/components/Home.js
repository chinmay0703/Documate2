import { React, useState, useEffect } from 'react'
import Nav from '../routes/Nav'
import Footer from '../routes/Footer'
import { Button } from 'primereact/button';
import "../css/home.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Home() {

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [formdata, setFormdata] = useState('');
    const [tokenpresnet, setTokenpresent] = useState('');
    const navigate = useNavigate();
    const handleNavbarToggle = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    const handleNavbarClose = () => {
        if (isNavbarOpen) {
            setIsNavbarOpen(false);
        }
    };
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
                setFormdata(response.data.user);
                console.log('Response:', response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    };

    const handleLogout = () => {
        localStorage.removeItem('Token');
        navigate("/login");
    };

    return (
        <div>
            <div>
                <div className="back">
                    <nav className="navbar navbar-expand-lg backk  bg-white container">
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
                                    <li className="nav-item text-start">
                                        <Link to="/dashboard" className=" nav-link active text-white" onClick={handleNavbarClose}>
                                            Dashboard
                                        </Link>
                                    </li>
                                </ul>
                                {tokenpresnet ? (<li style={{ display: 'flex', alignItems: 'center' }}>
                                    <p className="text-white" style={{ marginRight: '10px' }}>User: {formdata.name}</p>
                                    <Link to="/">
                                        <Button severity="danger" className="mx-1" onClick={handleLogout}>Logout</Button>
                                    </Link>
                                </li>) : (<ui>
                                    <Link to="/signup"><Button severity="primary" className="mx-1">Register</Button></Link>
                                    <Link to="/login"><Button severity="info" className="mx-1">Login</Button></Link>
                                </ui>)
                                }

                            </div>
                        </div>
                    </nav>
                </div>
                <div className="back" style={{ borderBottomLeftRadius: '20%', borderBottomRightRadius: '20%', }}>
                    <div className='row'>
                        <div className='col-lg-6 col-sm-12 my-5 text-white' style={{ textAlign: 'center' }}>
                            <h1 className="text-center my-5 elementor-heading-title">
                                Welcome to the Documate
                            </h1>

                            <div className="container container-fluid ">
                                <ul style={{ textAlign: 'left', listStyleType: 'none', padding: '30px' }}>
                                    <li className="mx-5 mb-3">
                                        <h3 style={{ color: '#FFD700', fontSize: '1.5rem', fontWeight: 'bold' }}>Step 1: Identify Goals</h3>
                                        <p style={{ fontSize: '1.5rem', lineHeight: '1.5' }}>Clearly define the objectives you want to achieve.</p>
                                    </li>
                                    <li className="mx-5 mb-3">
                                        <h3 style={{ color: '#FFD700', fontSize: '1.5rem', fontWeight: 'bold' }}>Step 2: Plan the Tasks</h3>
                                        <p style={{ fontSize: '1.5rem', lineHeight: '1.5' }}>Create a detailed plan outlining the necessary tasks.</p>
                                    </li>
                                    <li className="mx-5 mb-3">
                                        <h3 style={{ color: '#FFD700', fontSize: '1.5rem', fontWeight: 'bold' }}>Step 3: Execute the Plan</h3>
                                        <p style={{ fontSize: '1.5rem', lineHeight: '1.5' }}>Implement the plan with efficiency and effectiveness.</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex justify-content-center ">
                                <Button label="About us" className="by" severity="success" rounded />
                            </div>
                        </div>
                        <div className='col-lg-6 col-sm-12'>
                            <img src="https://www.ibigital.com/wp-content/uploads/design-768x672.png" className='image image-fluid my-3 mx-4' alt='dsj' width={'80%'} height={'80%'}></img>
                        </div>
                    </div>
                </div>
                <div className="bac my-5" style={{ borderBottomLeftRadius: '20%', borderBottomRightRadius: '2%' }}>
                    <div className="row justify-content-center my-5">
                        <a href="/" style={{ TextDecoration: 'none' }}> <h6 className="text-center my-2" style={{ TextDecoration: 'none' }}>Who we are</h6></a>
                        <h1 className="text-center" style={{ color: 'gray' }}> Your Notes Manager</h1>
                        <div className="col-sm-12 col-md-6 col-lg-3 my-5">
                            <div className="card sdd bg-light shadow p-3 mb-5 bg-white rounded">
                                <div className="card-header">
                                    <h3 className="text-center">Make Notes</h3>
                                </div>
                                <div className="card-body">
                                    <img src="https://www.ibigital.com/wp-content/uploads/design-768x672.png" width={'80%'} height={'80%'} alt="Note Image"></img>
                                </div>
                                <div className="card-footer">
                                    <p>We are here to help you just add your notes anywhere anytime </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-3 my-5">
                            <div className="card sdd bg-light shadow p-3 mb-5 bg-white rounded">
                                <div className="card-header">
                                    <h3 className="text-center">Add Notes</h3>
                                </div>
                                <div className="card-body">
                                    <img src="https://www.ibigital.com/wp-content/uploads/design-768x672.png" width={'80%'} height={'80%'} alt="Note Image"></img>
                                </div>
                                <div className="card-footer">
                                    <p>Now you can manage your notes just by clicking </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-3 my-5">
                            <div className="card sdd bg-light shadow p-3 mb-5 bg-white rounded">
                                <div className="card-header">
                                    <h3 className="text-center">Manage Notes</h3>
                                </div>
                                <div className="card-body">
                                    <img src="https://www.ibigital.com/wp-content/uploads/design-768x672.png" width={'80%'} height={'80%'} alt="Note Image"></img>
                                </div>
                                <div className="card-footer">
                                    <p>Now you can manage your notes just by clicking </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ba my-5" style={{ borderBottomLeftRadius: '', borderTopLeftRadius: '%' }}>
                    <div className='container'>
                        <h1 className='text-center my-5' style={{ color: 'gray' }} >What We Provide</h1>

                        <div className='col-sm-12 col-lg-12 col-md-12'>
                            <div className='row'>
                                <div className='col-lg-4 col-sm-12 my-5'>
                                    <div className='card'>
                                        <div className='card-header text-center'><h4 style={{ margin: '0' }}>Planning</h4></div>
                                        <div className='card-body'>
                                            <img src='https://img.freepik.com/free-vector/hand-drawn-flat-design-benchmark-illustration_23-2149331621.jpg?size=626&ext=jpg&ga=GA1.1.641460719.1706679308&semt=sph' width={'100%'} alt='Planning'></img>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-lg-4 col-sm-12 my-5'>
                                    <div className='card'>
                                        <div className='card-header text-center'><h4 style={{ margin: '0' }}>Accuracy</h4></div>
                                        <div className='card-body'>
                                            <img src='https://miro.medium.com/v2/resize:fit:1400/1*XzLI-YDNimmrDnZCw9y_Fw.jpeg' width={'100%'} alt='Accuracy'></img>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-lg-4 col-sm-12 my-5'>
                                    <div className='card'>
                                        <div className='card-header text-center'><h4 style={{ margin: '0' }}>Strategy</h4></div>
                                        <div className='card-body'>
                                            <img src='https://img.freepik.com/free-vector/multi-device-targeting-concept-illustration_114360-7465.jpg?w=740&t=st=1708084275~exp=1708084875~hmac=9b432110d0316efe0bea3ee8521c0560c48f820f8cab78e59fc90dfd1fa118fd' width={'100%'} alt='Strategy'></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Home