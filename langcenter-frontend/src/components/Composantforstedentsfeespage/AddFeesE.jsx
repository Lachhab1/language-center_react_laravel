import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import axios from '../../api/axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function AddFeesE()
{
      const { id } = useParams();
    const {user,setNotification,setVariant} = UseStateContext()
    const [pending, setPending] = useState(true);
  const navigate = useNavigate();
  let x = ""
  if (user && user.role==='admin')
  {
      x = ""
  } else if (user && user.role==='director')
  {
      x="/director"
  }
  else{
      x="/secretary"
  }
  const formik = useFormik({
  initialValues: {
    pamount: '',
    methode: ''
  },
  validationSchema: Yup.object({
    pamount: Yup.number().required('Paid amount is required'),
    methode: Yup.string(),
  }),
  onSubmit: (values) => {
    const data = {
      payment_amount:values.pamount,
      type:values.methode || 'cash',
    }
    axios.post(`/api/inscrires/${id}/register-payment`,data)
    .then((response)=>{
      console.log(response.data.data);
      setNotification("Fees added successfully");
      setVariant("success");
      setTimeout(() => {
          setNotification("");
          setVariant("");
          navigate(`${x}/income/student`);
      }
      , 3000);
    })
    .catch((error)=>console.log(error));
  },
  });
     // console.log(formData.status+' '+formData.date+' '+formData.amount)
      return (
  <div>
    <h1>Edit Income</h1>
    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-4">
          <label>Paid</label>
          <input
            className="form-control"
            type="number"
            name="pamount"
            {...formik.getFieldProps('pamount')}
          />
          {formik.touched.pamount && formik.errors.pamount ? (
            <div>{formik.errors.pamount}</div>
          ) : null}
        </div>
        <div className="col-4">
          <label>Payment Method</label>
          <select className="form-control" name="methode" {...formik.getFieldProps('methode')}>
            <option value="cash">Cash</option>
            <option value="cheque">Cheque</option>
            <option value="bank">Bank</option>
          </select>
        </div>
        <div className="col-10 mt-4">
          <button className="btn btn-success" type="submit">
            Save
          </button>
        </div>
        <div className="col-10 mt-4">
          <button className="btn btn-danger" type="button" onClick={formik.handleReset}>
            Reset
          </button>
        </div>
      </div>
    </form>
  </div>
);
    }
