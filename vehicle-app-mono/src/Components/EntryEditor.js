import React, { useState } from 'react';
import axios from 'axios';

function EntryEditor() {
  const [input, setInput] = useState({
    vehicleMake: '',
    vehicleModel: '',
    vehicleModelYear: '',
    vehicleColor: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function handleClick() {
    const newVehicle = {
      vehicleMake: input.vehicleMake,
      vehicleModel: input.vehicleModel,
      vehicleModelYear: input.vehicleModelYear,
      vehicleColor: input.vehicleColor,
    };

    axios.post('http://localhost:3001', newVehicle);

    alert('You have successfully added the vehicle!');
  }

  return (
    <div className='container bg-warning p-5 my-5'>
      <h1 className='my-5'>Vehicle Entry Editor</h1>
      <form>
        <h5>Vehicle Make</h5>
        <div className='form-group my-4'>
          <input
            onChange={handleChange}
            name='vehicleMake'
            value={input.vehicleMake}
            autoComplete='off'
            className='form-control'
            placeholder='Vehicle Make'
          ></input>
        </div>
        <h5>Vehicle Model</h5>
        <div className='form-group my-4'>
          <input
            onChange={handleChange}
            name='vehicleModel'
            value={input.vehicleModel}
            autoComplete='off'
            className='form-control'
            placeholder='Vehicle Model'
          ></input>
        </div>
        <h5>Vehicle Model Year</h5>
        <div className='form-group my-4'>
          <input
            onChange={handleChange}
            name='vehicleModelYear'
            value={input.vehicleModelYear}
            autoComplete='off'
            className='form-control'
            placeholder='Vehicle Model Year'
          ></input>
        </div>
        <h5>Vehicle Color</h5>
        <div className='form-group my-4'>
          <input
            onChange={handleChange}
            name='vehicleColor'
            value={input.vehicleColor}
            autoComplete='off'
            className='form-control'
            placeholder='Vehicle Color'
          ></input>
        </div>
        <button onClick={handleClick} className='btn btn-lg btn-success mt-5'>
          ADD VEHICLE
        </button>
      </form>
    </div>
  );
}

export default EntryEditor;
