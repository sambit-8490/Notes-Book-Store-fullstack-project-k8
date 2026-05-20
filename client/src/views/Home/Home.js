import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { currentUser } from '../../util/currentUser';

import './Home.css'
import { Link } from 'react-router-dom';

function Home() {

    useEffect(() => {
        if (!currentUser) {
            window.location.href = '/login';
        }
    }, []);

    return (
        <div>
            <Navbar user={currentUser?.name} />

            {/* heading names */}
            <div className='heading text-center'>
                <span className='main-heading'>BCS NOTESWALA</span> <br />
                <span className='main-head-2'>Welcome To Our</span>
                <button className='btn-wel'>World of Notes</button>
            </div>

            <br />

            {/* landing page */}
            <div className='row landing-page p-4'>
                <div className='col-md-6'>
                    <img
                        className='landing-image'
                        src="https://kit8.net/wp-content/uploads/2020/12/education@2x.png"
                        alt=''
                    />
                </div>

                <div className='col-md-6'>
                    <h3>Who Are We ?</h3>

                    <p className='information-bot mb-5'>
                        We are here to provide you
                        Quality of notes for Quality Future
                        and also helps you
                        for your Examinations and many competitive exams.
                    </p>

                    <a href='#feature'>
                        <button className='view btn btn-outline-warning m-2'>
                            Collection ▶
                        </button>
                    </a>

                    <a href='#about-us'>
                        <button className='view btn btn-outline-warning m-2'>
                            About-Us ▶
                        </button>
                    </a>
                </div>
            </div>

            {/* description */}
            <div className='row bg-light description-container'>
                <div className='col-md-6 p-5'>
                    <h2 className='about-heading'>Our Vision</h2>

                    <span className='information-bot'>
                        We are provided previous question papers. <br />
                        You Can Practice M.C.Q. Questions As Well As Theory Questions For Your Examination.
                        All Previous Past 10 Year Questions With Their Correct Answer.
                    </span>

                    <br />
                    <img
                        className='mt-3'
                        src="https://noteswala.online/wp-content/uploads/2022/06/kph-2.ico"
                        alt=""
                    />

                    <br />
                    <br />

                    <img
                        className='mt-3'
                        src="https://noteswala.online/wp-content/uploads/2022/06/kph-1.ico"
                        alt=""
                    />
                </div>

                <div className='col-md-6 p-5'>
                    <h4>Notes For BCS</h4>

                    <h4>
                        <span className='colo'>100+</span> Questions For Operating System
                    </h4>

                    <span className='information-bot'>
                        You Can Get Free Previous Year Questions For Practice for your University examinations.
                    </span>

                    <br />
                    <br />

                    <h4>
                        <span className='colo'>100+</span> Questions For Therotical Computer Science
                    </h4>

                    <span className='information-bot'>
                        You Can Get Free Previous Year Questions For Practice for your University examinations.
                    </span>

                    <br />
                    <br />

                    <h4>
                        <span className='colo'>100+</span> Questions For Software Testing
                    </h4>

                    <span className='information-bot'>
                        You Can Get Free Previous Year Questions For Practice for your University examinations.
                    </span>
                </div>
            </div>

            {/* featured collections */}
            <div className='row pb-5' id='feature'>

                <h1 className='about-heading mt-5'>Featured Collections</h1>

                {/* FY */}
                <div className='col-md-4'>
                    <div className="container features-container">
                        <div className="mobile-layout">

                            <div className="actions">
                                <i className="fas fa-chevron-left"></i>

                                <Link to="/FyPdfsList">
                                    <button
                                        type="button"
                                        className="view btn btn-outline-warning"
                                    >
                                        VIEW ALL
                                    </button>
                                </Link>
                            </div>

                            <div className="book-cover">
                                <img
                                    className="book-top"
                                    src="https://image.slidesharecdn.com/aslevel-1-150815105029-lva1-app6891/95/as-level-computer-science-book-1-1-638.jpg?cb=1439636192"
                                    alt="book-top"
                                />

                                <img
                                    className="book-side"
                                    src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-side.svg"
                                    alt="book-side"
                                />
                            </div>

                            <div className="preface">
                                <div className="content">

                                    <div className="header">
                                        <div className="title">
                                            FYBSC Computer Science
                                        </div>

                                        <div className="icon">
                                            <i className="fas fa-chevron-down"></i>
                                        </div>
                                    </div>

                                    <div className="body">
                                        <p>
                                            Here all FYBSC computer science subjects pdf's are available by semester wise.
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* SY */}
                <div className='col-md-4'>
                    <div className="container features-container">
                        <div className="mobile-layout">

                            <div className="actions">
                                <i className="fas fa-chevron-left"></i>

                                <Link to="/SyPdfsList">
                                    <button
                                        type="button"
                                        className="view btn btn-outline-warning"
                                    >
                                        VIEW ALL
                                    </button>
                                </Link>
                            </div>

                            <div className="book-cover">
                                <img
                                    className="book-top"
                                    src="https://www.ibbookshop.co.uk/wp-content/uploads/2017/03/9781471542091.jpg"
                                    alt="book-top"
                                />

                                <img
                                    className="book-side"
                                    src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-side.svg"
                                    alt="book-side"
                                />
                            </div>

                            <div className="preface">
                                <div className="content">

                                    <div className="header">
                                        <div className="title">
                                            SYBSC Computer Science
                                        </div>

                                        <div className="icon">
                                            <i className="fas fa-chevron-down"></i>
                                        </div>
                                    </div>

                                    <div className="body">
                                        <p>
                                            Here all SYBSC computer science subjects pdf's are available by semester wise.
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* TY */}
                <div className='col-md-4'>
                    <div className="container features-container">
                        <div className="mobile-layout">

                            <div className="actions">
                                <i className="fas fa-chevron-left"></i>

                                <Link to="/TyPdfsList">
                                    <button
                                        type="button"
                                        className="view btn btn-outline-warning"
                                    >
                                        VIEW ALL
                                    </button>
                                </Link>
                            </div>

                            <div className="book-cover">
                                <img
                                    className="book-top"
                                    src="https://www.ibbookshop.co.uk/wp-content/uploads/2017/09/9781471552335.jpg"
                                    alt="book-top"
                                />

                                <img
                                    className="book-side"
                                    src="https://raw.githubusercontent.com/atomic-variable/images-repo/e37f432405904a280858e5437ce1960753bc78a3/book-side.svg"
                                    alt="book-side"
                                />
                            </div>

                            <div className="preface">
                                <div className="content">

                                    <div className="header">
                                        <div className="title">
                                            TYBSC Computer Science
                                        </div>

                                        <div className="icon">
                                            <i className="fas fa-chevron-down"></i>
                                        </div>
                                    </div>

                                    <div className="body">
                                        <p>
                                            Here all TYBSC computer science subjects pdf's are available by semester wise.
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            {/* information */}
            <div className='row bg-light'>

                <div className='col-md-6 text-center px-5 pt-5'>

                    <h1 className='text-center about-heading'>
                        Study Material For Your Examinations.
                    </h1>

                    <br />

                    <span className='information-bot'>
                        Here You Can Get Free Notes Of All Courses All Subjects i.e Notes for BSC Computer Science,
                        BSC, BA, BCA Just Click By Once & Get All Subjects & Chapters PDF's.
                        You Can Do Revision For your Examinations A Day Before Your Exams.
                    </span>

                </div>

                <div className='col-md-6 text-center mt-5 mb-5'>

                    <img
                        className='information-img'
                        src="https://img.freepik.com/free-vector/online-library-app-reading-banner_33099-1733.jpg"
                        alt="The whole library png"
                    />

                </div>

            </div>

            <Footer />
        </div>
    )
}

export default Home
