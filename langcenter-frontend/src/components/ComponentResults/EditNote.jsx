import { useState } from "react";


export default function EditNote()
{

    const [formData, setFormData] = useState(
        {eng:15,gram:14}
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

    return (
        <div>
            <form>
               <div className="row">
                    <div className="col-4">
                        <label className="form-label">Eng</label>
                        <input className="form-control" type="number" name="eng" value={formData.eng} onChange={handleChange}/>
                    </div>
                    <div className="col-4">
                        <label className="form-label">Gram</label>
                        <input className="form-control" type="number" name="gram" value={formData.gram} onChange={handleChange}/>
                    </div>
                   
                 
                    <div className='col-10 mt-4 '>
                      
                    <button className="btn btn-success"type="submit" onClick={handleSave}>Save</button>
                     </div>
                </div>
            </form>
        </div>
    )
}