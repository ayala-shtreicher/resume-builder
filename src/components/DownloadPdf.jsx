import React, { useContext, useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResumesContext } from '../context/resumes';
import { useNavigate, useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js'


export default function DownloadResume() {
    const { resumes } = useContext(ResumesContext);
    const { index } = useParams();
    const pdfRef = useRef();
    const [currentResume, setCurrentResume] = useState({})
    const navigate = useNavigate();


    useEffect(() => {
        setCurrentResume(resumes[index]);
        console.log(currentResume.imageUrl)
    }, [index, currentResume]);

    const handleNavigate = () => {
        navigate('/list');
    }


    const handleDownload = () => {
        const resumeElement = pdfRef.current;

        if (resumeElement) {
            const pdfOptions = {
                margin: 2,
                filename: 'resumeFile.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };

            html2pdf().from(resumeElement).set(pdfOptions).save();
        }

    };





    return (
        <>
            <div className='col-6 border w-100 text-center'>
                <h1>MY RESUME</h1>
                <div id="styled-content" style={{ height: "90vh" }} ref={pdfRef}>
                    <h1 className="display-4"><b>{currentResume.fullName}</b></h1>
                    <div className="container mt-4 h-100">
                        <div className='row h-100'>
                            <div className="col-4">
                                <div className="h-100 pb-1">
                                    <div className="jumbotron h-100">
                                        <div className='row justify-content-center'>
                                            <img className="rounded-circle overflow-hidden" src={currentResume.imageUrl} alt="" />
                                            {/* {currentResume.imageUrl ? <img src={URL.createObjectURL(currentResume.imageUrl)} width="120px" height="120px" alt="profile pic" /> : currentResume.imageUrl && <img src={currentResume.imageUrl} width="120px" height="120px" alt="profile pic" />} */}
                                            {/* <div  style={{ backgroundSize: 'cover', backgroundPosition: 'center', width: '150px', height: '150px', backgroundImage: `url(${currentResume.imageUrl})` }}> */}
                                            {/* </div> */}
                                        </div>

                                        <hr />
                                    </div>
                                </div>
                            </div>

                            <div className="col-8">
                                <div className="">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <h2 className="card-title">Education</h2>
                                            <ul>
                                                {currentResume.educations?.map((e, index) => (
                                                    <li key={index}>
                                                        <p className="card-text">{`  ${e.learning} `}</p>
                                                        <p className="card-text">{`For: ${e.timeFrame}`}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                                <div className="">
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <h2 className="card-title">Work Experience</h2>
                                            <ul>
                                                {currentResume.companies?.map((c, index) => (
                                                    <li key={index}>
                                                        <p className="card-text">{c.timeFrame}</p>

                                                        <p>{c.companyName}</p>


                                                    </li>
                                                ))}
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <button className="btn btn-secondary btn-lg btn-block text-info" onClick={handleDownload}>download PDF</button>
            </div >
            <button className="btn btn-secondary btn-lg btn-block text-info" onClick={handleNavigate}>My Resumes</button>
        </>
    )
}
