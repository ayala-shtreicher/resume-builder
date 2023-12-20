import React, { useState, useContext } from 'react';
import { ResumesContext } from '../context/resumes';
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { database } from '../firebaseconfig';
import { useNavigate } from 'react-router-dom';
import UpImage from './UploadImg';


export default function Form() {
    const { userLogin, getUsers, user, addBNewResume } = useContext(ResumesContext);
    const collectionRef = collection(database, "resumes");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        companies: [{ companyName: '', timeFrame: '' }],
        educations: [{ learning: '', timeFrame: '' }],
        imageUrl: null,
        ownerId: userLogin?.uid
    });



    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleCompanyChange = (event, index) => {
        const { name, value } = event.target;
        const updatedCompanies = [...formData.companies];
        updatedCompanies[index][name] = value;
        setFormData((prevState) => ({ ...prevState, companies: updatedCompanies }));
    };

    const handleEducationChange = (event, index) => {
        const { name, value } = event.target;
        const updatedEducations = [...formData.educations];
        updatedEducations[index][name] = value;
        setFormData((prevState) => ({ ...prevState, educations: updatedEducations }));
    };

    const addCompany = () => {
        setFormData((prevState) => ({
            ...prevState,
            companies: [...prevState.companies, { companyName: '', timeFrame: '' }],
        }));
    };

    const addEducation = () => {
        setFormData((prevState) => ({
            ...prevState,
            educations: [...prevState.educations, { learning: '', timeFrame: '' }],
        }));
    };

    const handleSubmit = (event) => {
        console.log(formData.imageUrl);
        event.preventDefault();

        addBNewResume(formData);

        navigate('/list')
    };
    const handleImage = (imageUr) => {

        setFormData((prevState) => ({ ...prevState, imageUrl: imageUr }));
alert(imageUr)
    };


    return (
        <>
            <div className="container mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" className="form-control" name="fullName"
                            value={formData.fullName}
                            onChange={handleChange} required />
                    </div>


                    <h2>Work experience</h2>
                    {formData.companies.map((company, index) => (
                        <div key={index} className="form-group">
                            <label>
                                Company name:
                                <input
                                    type="text"
                                    name="companyName"
                                    value={company.companyName}
                                    onChange={(e) => handleCompanyChange(e, index)}
                                    className="form-control" required
                                />
                            </label>
                            <label>
                                Time frame:
                                <input
                                    type="text"
                                    name="timeFrame"
                                    value={company.timeFrame}
                                    className="form-control" required
                                    onChange={(e) => handleCompanyChange(e, index)}
                                />
                            </label>
                        </div>
                    ))}
                    <button type="button" onClick={addCompany}>
                        Add Company
                    </button>

                    <h2>Education</h2>
                    {formData.educations.map((education, index) => (
                        <div key={index}>
                            <label>
                                Learning:
                                <input
                                    type="text"
                                    name="learning"
                                    value={education.learning}
                                    className="form-control" required
                                    onChange={(e) => handleEducationChange(e, index)}
                                />
                            </label>
                            <label>
                                Time frame:
                                <input
                                    type="text"
                                    name="timeFrame"
                                    value={education.timeFrame}
                                    className="form-control" required
                                    onChange={(e) => handleEducationChange(e, index)}
                                />
                            </label>
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary" onClick={addEducation}>
                        Add Education
                    </button>
                    <UpImage handleImage={handleImage} />
                    <br />
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </form>
            </div >
        </>
    );
}