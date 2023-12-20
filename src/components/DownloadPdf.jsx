import React, { useContext, useRef, useEffect, useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResumesContext } from '../context/resumes';
import { useNavigate, useParams } from 'react-router-dom';
export default function DownloadResume() {
    const { resumes } = useContext(ResumesContext);
    const { index } = useParams();
    const pdfRef = useRef();
    const [currentResume, setCurrentResume] = useState({})
    const image = "../images/2021-04-1.png"
    const navigate=useNavigate();


    useEffect(() => {
        setCurrentResume(resumes[index]);
        console.log(currentResume)
    }, [index, currentResume]);

const handleNavigate=()=>{
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
            const imgY = 10; // Adjust the Y-coordinate as needed

            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save(`resume.pdf`);
        });
    }
    // <pre ref={pdfRef}>{JSON.stringify(resumes, null, 2)}</pre>

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
                                            {/* {currentResume.imageUrl && <img src={URL.createObjectURL(currentResume.imageUrl)} alt="" />}  */}
                                            <div className="rounded-circle overflow-hidden" style={{ backgroundSize: 'cover', backgroundPosition: 'center', width: '150px', height: '150px', backgroundImage: `url(${currentResume.imageUrl})` }}> 
                                        </div> 
                                    </div>
                                    <h1 className="display-4">{currentResume.fullName}</h1>
                                    {/* <p className="lead">Web Developer</p>
                                    <hr className="my-4" />
                                    <p>john.doe@example.com</p>
                                    <p>(123) 456-7890</p>
                                    <p>linkedin.com/in/johndoe</p> */}
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
            <button onClick={downloadPDF}>download PDF</button>
        </div >
        <button onClick={handleNavigate}>My Resumes</button>

        </>
    )
}
