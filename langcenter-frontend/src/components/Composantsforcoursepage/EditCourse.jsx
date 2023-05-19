import { useState } from "react";

export default function EditCourse()
{
    const [formData, setFormData] = useState(
        {course_code:"1",course_name:"sopa",duration:"10",subject_name:"eng",teacher:"sopa",action:""}
    );
    const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };
      const handleSave = (event) => {
        // Perform save operation here
        event.preventDefault();
        console.log(formData)
      };

    return(
        <div>
            <form>
                <div className="row">
                    <div className="col-4">
                        <label className="form-label">Course code</label>
                        <input className="form-control" type="text" name="course_code" value={formData.course_code} onChange={handleChange}/>
                    </div>
                    <div className="col-4">
                        <label className="form-label">Course Name</label>
                        <input className="form-control" type="text" name="course_name" value={formData.course_name} onChange={handleChange}/>
                    </div>
                    <div className="col-4">
                        <label className="form-label">Duration[Hour]</label>
                        <input className="form-control" type="number" name="duration" value={formData.duration} onChange={handleChange}/>
                    </div>
                    <div className="col-4">
                        <label className="form-label">Subject Name</label>
                        <input className="form-control" type="text" name="subject_name" value={formData.subject_name} onChange={handleChange}/>
                        <br />
                    </div>
                    <div className="col-4">
                        <label className="form-label">Teacher</label>
                        <input className="form-control" type="text" name="teacher" value={formData.teacher} onChange={handleChange}/>
                    </div>
                    
                    <div className='col-10 mt-4 '>
                      
                    <button className="btn btn-success"type="submit" onClick={handleSave}>Save</button>
                </div>
                </div>
            </form>
        </div>
    )
}