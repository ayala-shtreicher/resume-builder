import React, { useState, useRef, useContext } from 'react';
import ResumesContext from '../context/resumes';


export default function Form() {
    const { addResume,resumes } = useContext(ResumesContext);
    const [formData, setFormData] = useState({
        fullName: '',
        companies: [{ companyName: '', timeFrame: '' }],
        educations: [{ learning: '', timeFrame: '' }],
        imageUrl: '',
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
        event.preventDefault();
        addResume(formData);
        console.log(resumes);
        addResume(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </label>
                <h2>Work experience</h2>
                {formData.companies.map((company, index) => (
                    <div key={index}>
                        <label>
                            Company name:
                            <input
                                type="text"
                                name="companyName"
                                value={company.companyName}
                                onChange={(e) => handleCompanyChange(e, index)}
                            />
                        </label>
                        <label>
                            Time frame:
                            <input
                                type="text"
                                name="timeFrame"
                                value={company.timeFrame}
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
                                onChange={(e) => handleEducationChange(e, index)}
                            />
                        </label>
                        <label>
                            Time frame:
                            <input
                                type="text"
                                name="timeFrame"
                                value={education.timeFrame}
                                onChange={(e) => handleEducationChange(e, index)}
                            />
                        </label>
                    </div>
                ))}
                <button type="button" onClick={addEducation}>
                    Add Education
                </button>
                <input type="submit" value="Submit" />
            </form>

        </>
    );
}