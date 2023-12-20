import React, { useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumesContext } from '../context/resumes';

const MyPage = () => {
    const navigate = useNavigate();
    const { resumes ,getAllResumes,userLogin} = useContext(ResumesContext);

    const handleClick = (index) => {
        navigate(`/resume/${index}`);
    };
    const handleAdd = () => {
        navigate(`/form`);
    };
    useEffect(() => {
        getAllResumes();
        console.log(userLogin)
    }, [])

    return (
        <div className="container-fluid bg-light">
            <div className="row justify-content-center align-items-center min-vh-100">
                <div className="col-12 text-center">
                    <h1 className="mb-4">הרשימה שלי</h1>
                    <div className="btn-group" role="group">
                        {resumes.map((r, index) =>
                            <button type="button" className="btn btn-purple" onClick={() => handleClick(index)} key={index}>resume {resumes[index].fullName}</button>
                        )}

                    </div>
                    <button type="button" className="btn btn-purple" onClick={handleAdd}>יצירת קוח</button>

                </div>
            </div>
        </div>
    );
}

export default MyPage;