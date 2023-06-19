import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { UseStateContext } from '../../context/ContextProvider';

const EditSalle = () => {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [errors, setErrors] = useState({});
  const {user,setNotification, setVariant } = UseStateContext();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/classroom/${id}`, { name, capacity });

      if (response.status === 200) {
        setNotification('Class updated successfully');
        setVariant('warning');
        setTimeout(() => {
          setNotification('');
          setVariant('');
        }, 3000);
        navigate(`${x}/classroom`);
        
      } else {
        console.log('Error updating data');
      }
    } catch (error) {
      console.log('Error communicating with the server', error);
    }

  };


  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/classroom/${id}`);
        const { name, capacity } = response.data.classroom;
        setName(name);
        setCapacity(capacity);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleCapacityChange = (e) => {
    const newCapacity = e.target.value;
    setCapacity(newCapacity);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  return (
    <form className='edit-salle-form' onSubmit={handleSubmit}>
      <div className='row'>
        <div className='form-group col-lg-5'>
          <label htmlFor='name'>Name*</label>
          <input
            style={{ backgroundColor: 'rgba(221, 222, 238, 0.5)', border: 'none', borderRadius: '8px' }}
            type='text'
            name='name'
            value={name}
            onChange={handleNameChange}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder='Entrez le nom de la salle'
          />
          {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
        </div>

        <div className='form-group col-lg-5 mt-3 mt-lg-0'>
          <label htmlFor='capacity'>Capacity*</label>
          <input
            style={{ backgroundColor: 'rgba(221, 222, 238, 0.5)', border: 'none', borderRadius: '8px' }}
            type='number'
            name='capacity'
            value={capacity}
            onChange={handleCapacityChange}
            className={`form-control ${errors.capacity ? 'is-invalid' : ''}`}
            placeholder='Entrez la capacité de la salle'
          />
          {errors.capacity && <div className='invalid-feedback'>{errors.capacity}</div>}
        </div>
      </div>


      <button type='submit' className='btn btn-danger mt-2'>
        Update Classroom
      </button>
    </form>
  );
};

export default EditSalle;
