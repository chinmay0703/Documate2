import React from 'react'
import '../routes/footer.css'
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Instagram';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import axios from 'axios';
function Footer() {




    const handledeleteallusers = () => {
        axios.delete(`http://localhost:3001/deeleteall`)
            .then(response => {
                console.log("all user deleted")
            })
            .catch(error => {
                console.log(error.message);
            })
    };
    return (
        <div>
            <footer class="footer-section ">
                <div class="container">
                    <div class="footer-content pt-5 pb-5">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 mb-50">
                                <div class="footer-widget">
                                    <div class="footer-logo">
                                        <div class="footer-widget-heading">
                                            <h3>About Us</h3>
                                        </div>
                                    </div>
                                    <div class="footer-text">
                                        <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                                            elit,Lorem ipsum dolor sit amet.</p>
                                    </div>
                                    <div className="footer-social-icon my-4">
                                        <span>Follow us</span>
                                        <a href="/"><FacebookIcon className="facebook-bg" /></a>
                                        <a href="/"><TwitterIcon className="twitter-bg" /></a>
                                        <a href="/"><GoogleIcon className="google-bg" /></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
                                <div class="footer-widget">
                                    <div class="footer-widget-heading">
                                        <h3>Useful Links</h3>
                                    </div>
                                    <ul>
                                        <li><a href="/">Home</a></li>
                                        <li><a href="/">Features</a></li>
                                        <li><a href="/">contactus</a></li>
                                        <li><a href=''onClick={handledeleteallusers}>deleteusers</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-6 mb-50">
                                <div class="footer-widget">
                                    <div class="footer-widget-heading">
                                        <h3>Subscribe</h3>
                                    </div>
                                    <div class="footer-text mb-25">
                                        <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                                    </div>
                                    <div class="subscribe-form">
                                        <form action="#">
                                            <input type="text" placeholder="Email Address" />
                                            <button><i class="fab fa-telegram-plane"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    {/* <div class="copyright-area">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 text-center text-lg-left">
                                    <div class="copyright-text">
                                        <p style={{ textDecoration: 'none' }}>Copyright &copy; 2023, All Right Reserved <a href="/" style={{ textDecoration: 'none' }} >chinmay</a></p>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                                    <div class="footer-menu">
                                        <ul>
                                            <li><a href="/">Home</a></li>
                                            <li><a href="/">Terms</a></li>
                                            <li><a href="/">Privacy</a></li>
                                            <li><a href="/">Policy</a></li>
                                            <li><a href="/">Contact</a></li>
                                            <li><a href='' onClick={handledeleteallusers}>admin</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
            </footer>
        </div>
    )
}

export default Footer