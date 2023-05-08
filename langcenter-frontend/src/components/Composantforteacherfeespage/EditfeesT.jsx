import React, { useState, useEffect } from 'react';


export default function EditFeesT()
{
    const [formData, setFormData] = useState(
    {id:"1",name:"sopa",gender:"male",hours:"1",amount:"1000",status:"paid",date:"07-05-2022",action: ""}
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
      const handleReset = (event) => {
        event.preventDefault();
        console.log(formData)
    }

    return(
        <div>
                <form>
          <div className="row">
                <div className='col-4'>
                    <label>ID</label>
                    <input className="form-control" type="text" name="id" value={formData.id}  />
                </div>
                <div className='col-4'>
                    <label>Name</label>
                    <input className="form-control " type="text" name="name" value={formData.name}  />
                </div>
                <div className='col-4'>
                    <label>Gender</label>
                    <input className="form-control"type="text" name="gender" value={formData.gender}  />
                    <br />
                </div>
                
                <div className='col-4'>
                    <label>Hours</label>
                    <input className="form-control"type="number" name="hours" value={formData.hours} onChange={handleChange}  />
                </div>
                <div className='col-4'>
                    <label>Amount</label>
                    <input className="form-control"type="number" name="amount" value={formData.amount} onChange={handleChange} />
                </div>
                <div className='col-4'>
                    <label>Status</label>
                    <select className="form-control" name="status" value={formData.status}  onChange={handleChange}>
                         <option value="paid">Paid</option>
                         <option value="unpaid">Unpaid</option>
                    </select>
                    <br />
                </div>
                
                <div className='col-4'>
                    <label>Date</label>
                    <input className="form-control"type="date" name="date" value={formData.date} onChange={handleChange} />
                </div>
                <br />
                <div className='col-10 mt-4 '>
                    <button className="btn btn-success"type="submit" onClick={handleSave}>Save</button>
                </div>
                <div className='col-10 mt-4 '>
                    <button className="btn btn-danger"type="submit" onClick={handleReset}>Reset</button>
                </div>
          </div>
          
          </form>
         
        </div>
    )
}