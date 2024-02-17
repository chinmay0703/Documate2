import React, { useRef, useState ,useEffect} from 'react';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import '../components/login.css';
import Nav from '../routes/Nav';
import Footer from '../routes/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const toast = useRef(null);
    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Login Successfully', detail: 'Welcome To the Documate', life: 3000 });
    }
    const showError = (er) => {
        toast.current.show({ severity: 'error', summary: 'Try again', detail: er, life: 3000 });
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        var token = localStorage.getItem('Token');
        if (token) {
            showError("You are Allready Loged In");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/auntheticatelogin', {
                email: formData.email,
                password: formData.password,
            });
            console.log('Response:', response.data.token);
            localStorage.setItem("Token", response.data.token);
            if (response) {
                showSuccess()
                setTimeout(function () {
                    navigate("/dashboard");
                }, 1000);
            }
            else {
                showError("Icorrect Credentials")
            }
        } catch (error) {
            showError("Icorrect Credentials")
            console.error('Error:', error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [formdata, setFormdata] = useState('');
    const [tokenpresnet, setTokenpresent] = useState('');
    const handleNavbarToggle = () => {
        setIsNavbarOpen(!isNavbarOpen);
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
    const handleNavbarClose = () => {
        if (isNavbarOpen) {
            setIsNavbarOpen(false);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('Token');
        navigate("/");
    };
    return (
        <div>
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
                                        <p className="text-white" style={{ marginRight: '10px' }}>User: {formdata.name}</p>
                                        <Link to="/">
                                            <Button severity="danger" className="mx-1" onClick={handleLogout}>Logout</Button>
                                        </Link>
                                    </li>
                                ) : (
                                    <>
                                        <li style={{ display: 'flex', alignItems: 'center' }}>
                                            <Link to="/signup">
                                                <Button severity="primary" className="mx-1">Register</Button>
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <Toast ref={toast} />
            <div className="signupback" style={{ borderBottomLeftRadius: '20%', borderBottomRightRadius: '20%', height: '750px', }}>
                <div className='row'>
                    <div className='col-lg-6 col-sm-12 '>
                        <img src="https://www.ibigital.com/wp-content/uploads/design-768x672.png" className='image image-fluid my-3 mx-4' alt='dsj' width={'80%'} height={'80%'}></img>
                    </div>
                    <div className='col-lg-5 col-sm-6 my-5 card'>
                        <h1 className='text-center my-3'>Welcome, User!
                        </h1>
                        <small id="em" class="form-text text-center text-muted">Please Log In</small>
                        <form className='mx-3 my-3' onSubmit={handleSubmit}>
                            <div className="form-group my">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group my-2">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <strong id="emailHelp" className="form-text text-muted my-2">We'll never share your Password<br></br></strong><b></b>
                            <strong className='my-4'>
                                Please <a href='/signup' className='my-4' style={{ textDecoration: 'none' }}>Register!!</a> if not registered yet
                                <p className='my-2'></p><Link style={{ textDecoration: 'none' }} to={"/forgotpassword"}>Recover</Link> your Password?
                            </strong>
                            <button type="submit" className="btn btn-primary w-100 my-2">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Login;
