import React, { useState } from 'react';

const EditProfile = () => {
  const [firstName, setFirstName] = useState('WALID');
  const [lastName, setLastName] = useState('REGRAGUI');
  const [phoneNumber, setPhoneNumber] = useState('0600001002');
  const [email, setEmail] = useState('diroNaya@gmail.com');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // TODO: handle form submission
    console.log({
      firstName,
      lastName,
      phoneNumber,
      email
    });
  };

  return (
    <div>
      <h2>Profile Form</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </form>
      <style>
        {`
          label {
            display: block;
            margin-bottom: 10px;
          }
          input {
            margin-left: 10px;
          }
          button {
            margin-top: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default EditProfile;
