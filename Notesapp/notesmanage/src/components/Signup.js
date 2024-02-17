import React, { useRef, useState, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import Nav from '../routes/Nav'
import Footer from '../routes/Footer'
import { Password } from 'primereact/password';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
function Signup() {
    const header = <div className="font-bold mb-3">Pick a password</div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    );
    const toast = useRef(null);
    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Signup Successfully', detail: 'Please login Now', life: 3000 });
    }
    const showError = (er) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: er, life: 3000 });
    }
    const [password, setPassword] = useState('');
    const [value1, setValue1] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [formdata, setFormdata] = useState('');
    const [tokenpresnet, setTokenpresent] = useState('');
    const navigate = useNavigate();
    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!password || !name || !email) {
            showError("Please fill out all  fields.");
            return;
        }
        var token = localStorage.getItem('Token');
        if (token) {
            showError("Unable to Sign Up: You are currently logged in. Please log out before creating a new account.");
            return;
        }
        if (password === value1) {
            const formdata = {
                password,
                name,
                email,
            };
            try {
                console.log(password, name, email);
                const response = await axios.post('http://localhost:3001/postdata', formdata);
                console.log(response.data);
                showSuccess();
                setTimeout(function () {
                    navigate("/login");
                }, 1000);
            } catch (error) {
                if (error.response) {
                    showError(`${error.response.data.error}`);
                } else if (error.request) {
                    showError('No response received');
                } else {
                    showError(error.message);
                }
            }
        } else {
            showError("Password Doesn't Match");
        }
    };
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
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
        navigate("/");

    };

    return (
        <div>
            {/* <Nav></Nav> */}
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
                                        <p className="text-white" style={{ marginRight: '10px' }}>User: {formdata.name}</p>
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
            <div className="signupback" style={{ borderBottomLeftRadius: '20%', borderBottomRightRadius: '20%', height: '800px', }}>
                <div className='row'>
                    <div className='col-lg-6 col-sm-12 '>
                        <img src="https://www.ibigital.com/wp-content/uploads/design-768x672.png" className='image image-fluid my-3 mx-4' alt='dsj' width={'80%'} height={'80%'}></img>
                    </div>
                    <div className='col-lg-5 col-sm-12 card my-5 '>
                        <h1 className='text-center '>Sign Up </h1>
                        <form className='mx-3 my-3 '>
                            <div class="form-group">
                                <label for="name">Name </label>
                                <input type="text"
                                    class="form-control" id="name"
                                    value={name} onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    required />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1"
                                    placeholder="Enter Valid Email Address"
                                    required
                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <div className='row'>
                                    <div className='col-sm-12 col-lg-6'>
                                        <label htmlFor="password1">Enter Password</label>
                                        <div className="form-group">
                                            <Password
                                                id="password1"
                                                style={{ width: '100%' }}
                                                inputStyle={{ width: '100%' }}
                                                value={password} onChange={(e) => setPassword(e.target.value)}
                                                placeholder='Enter Password'
                                                required
                                                header={header}
                                                footer={footer}
                                            />
                                            <small id="emailHelp" class="form-text text-muted">We'll never share your password.</small>
                                        </div>
                                    </div>
                                    <div className='col-sm-12 col-lg-6'>
                                        <label htmlFor="password2">Confirm password</label>
                                        <div className="form-group">
                                            <Password
                                                id="password2"
                                                value={value1} onChange={(e) => setValue1(e.target.value)}
                                                style={{ width: '100%' }}
                                                inputStyle={{ width: '100%' }}
                                                feedback={false}
                                                placeholder='Re enter Password'
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <strong >Already have an account,<Link style={{ textDecoration: 'none' }} to={"/login"}> Sign In</Link></strong>
                            <button type="submit" onClick={handlesubmit} class="btn btn-primary w-100 my-3">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Signup