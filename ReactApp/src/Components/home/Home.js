import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home">
            <div className="page-content">
            {/* Start Navbar */}
            <div className="nav-wrapper">
                <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link className="navbar-brand" to="/">
                    <img src="./images/blue-logo.svg" alt="Rank up Logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#homeNavBar" aria-controls="homeNavBar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="homeNavBar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link btn btn-bBlue" to="/signup">Sign up</Link>
                        </li>
                    </ul>
                    </div>
                </nav>
                </div>
            </div>
            {/* End Navbar */}
            {/* Start Header */}
            <header className="header top">
                <div className="container">
                <div className="body">
                    <div className="row">
                    <div className="col-7">
                        <div className="text">
                        <h1 className="logo"><span className="buono-icon buono-logo">Rank UP</span></h1>
                        <p>Recruitment process is now easier, faster, and more efficient</p>
                        <div className="get-start text-center">
                            <Link to="/signup" className="btn btn-bBlue">Getting started for free</Link>
                        </div>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="image">
                        <img src="images/shape.svg" alt="" />
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </header>
            {/* End Header */}
            {/* Start Down Arrow */}
            <div className="down-arrow text-center">
                <img src="./icons/arrow.svg" className="js-goDown" alt="" />
            </div>
            {/* End Down Arrow */}
            {/* Start About Us */}
            <section className="about-us" data-section="about-us">
                <div className="container">
                <div className="upper-text">
                    <p>A Better hiring Experience</p>
                    <div className="quote">
                    <span className="line" />
                    <p><span>We're committed</span> to provide a new vision about hiring process.</p>
                    </div>
                </div>
                <div className="text-image">
                    <div className="row">
                    <div className="col-7">
                        <div className="image">
                        <img src="./images/aibased.svg" alt="" />
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="text">
                        <h3>AI based Recommendation System</h3>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            {/* End About Us */}
            {/* Start Features */}
            <section className="features" data-section="features">
                <div className="container">
                <div className="section-head text-center">
                    <h2>Our Features</h2>
                    <p className="description">See what things you get when you use our app</p>
                </div>
                <div className="content-box">
                    <div className="row">
                    <div className="col-4">
                        <div className="feat text-center">
                        <div className="feat-icon">
                            <img src="./icons/trending-up.svg" alt="" />
                        </div>
                        <div className="feat-text">
                            <h3 className="feat-heading">Scalability</h3>
                            <p className="feat-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
                        </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="feat text-center">
                        <div className="feat-icon">
                            <img src="./icons/clock 1.svg" alt="" />
                        </div>
                        <div className="feat-text">
                            <h3 className="feat-heading">Time Saving</h3>
                            <p className="feat-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
                        </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="feat text-center">
                        <div className="feat-icon">
                            <img src="./icons/target.svg" alt="" />
                        </div>
                        <div className="feat-text">
                            <h3 className="feat-heading">Efficiency</h3>
                            <p className="feat-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            {/* End Features */}
            {/* Start Get Starting */}
            <section className="get-start">
                <div className="container">
                <div className="sect-content">
                    <div className="section-head text-center">
                    <h3>Hire your next efficient employee</h3>
                    <p>Experience the most efficient process to choose the best applicant for your position</p>
                    </div>
                    <div className="button text-center">
                    <Link to="/signup" className="btn btn-bBlue">Getting started for free</Link>
                    </div>
                </div>
                </div>
            </section>
            {/* End Get Starting */}
            {/* Start Footer */}
            <footer>
                <div className="container">
                <div className="body">
                </div>
                <div className="tail text-center">
                    <p>2020 © CopyRights Are Reserved</p>
                </div>
                </div>
            </footer>
            {/* End Footer */}
            </div> 
        </div>
    );
};

export default Home;