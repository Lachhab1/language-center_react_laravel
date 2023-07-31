import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';
import axios from '../../api/axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function EditFees()
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
    iamount: '',
    aamount: '',
    pamount: '',
  },
  validationSchema: Yup.object({
    aamount: Yup.number().required('Agreed amount is required'),
    pamount: Yup.number().required('Paid amount is required'),
  }),
  onSubmit: (values) => {
    const data = {
      negotiated_price:values.aamount,
      payment_amount:values.pamount,
    }
    axios.put(`/api/update-payment/${id}`,data)
    .then((response)=>{
      console.log(response.data.data);
      setNotification("Fees updated successfully");
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
      useEffect(()=>{
        const fetchData = async() => axios.get('/api/inscrire-classes/'+id).then((response)=>{
            console.log(response.data.data);
            formik.setValues(
                {
                    id:response.data.data.id,
                    iamount: Math.round(response.data.data.cours.price),
                    aamount:Math.round(response.data.data.negotiated_price),
                    pamount:Math.round(response.data.data.payment.amount),
                }
            );
              })
          .catch((error)=>console.log(error));
          setTimeout(async() => {
          await fetchData();
          setPending(false);
        }, 200);
      },[])

     // console.log(formData.status+' '+formData.date+' '+formData.amount)
      return (
  <div>
    <h1>Edit Income</h1>

    <form onSubmit={formik.handleSubmit}>
      <div className="row">
        <div className="col-4">
          <label>Amount</label>
          <input
            className="form-control"
            type="number"
            name="iamount"
            {...formik.getFieldProps('iamount')}
            readOnly
          />
        </div>
        <div className="col-4">
          <label>Agreed</label>
          <input
            className="form-control"
            type="number"
            name="aamount"
            {...formik.getFieldProps('aamount')}
          />
          {formik.touched.aamount && formik.errors.aamount ? (
            <div>{formik.errors.aamount}</div>
          ) : null}
        </div>
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
