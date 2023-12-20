import React, { useContext, useEffect, useRef, useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResumesContext } from '../context/resumes';
import { useNavigate, useParams } from 'react-router-dom';

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


    const downloadPDF = () => {
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 10;

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(`resume.pdf`);
        });
    }


    

    return (
        <>
            <div className='col-6 border w-100 text-center'>
                <h1>MY RESUME</h1>
                <div id="styled-content" style={{ height: "90vh" }} ref={pdfRef}>
                    <div className="container mt-4 h-100">
                        <div className='row h-100'>
                            <div className="col-4">
                                <div className="h-100 pb-1">
                                    <div className="jumbotron h-100">
                                        <div className='row justify-content-center'>
                                            <img className="rounded-circle overflow-hidden" src={currentResume.imageUrl} alt="" />
                                            <img src={URL.createObjectURL(currentResume.imageUrl)} width="120px" height="120px" alt="profile pic" />
                                            {/* <div  style={{ backgroundSize: 'cover', backgroundPosition: 'center', width: '150px', height: '150px', backgroundImage: `url(${currentResume.imageUrl})` }}> */}
                                            {/* </div> */}
                                        </div>
                                        <h1 className="display-4">{currentResume.fullName}</h1>

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
                <button className="btn btn-secondary btn-lg btn-block text-info" onClick={downloadPDF}>download PDF</button>
            </div >
            <button className="btn btn-secondary btn-lg btn-block text-info" onClick={handleNavigate}>My Resumes</button>
        </>
    )
}
