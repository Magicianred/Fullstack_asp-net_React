import React, { useState } from 'react'
import CarList from './car/CarList';
import CarListForm from './car/CarListForm';

 const Visualize = () => {
    const [input, setInput] = useState({hasParkingSensor: false,hasRearViewCamera: false,hasLeatherSeats: false}); 
    const [cars, setCars] = useState([]); 
    const [editCar,setEditCar] = useState(null)
    
   
        return (
          <div className="container">
            <div className="wrapper">
            <CarListForm 
              input={input}
              setInput={setInput}
              cars={cars}
              setCars={setCars}
              editCar={editCar}
              setEditCar={setEditCar}
            />
              <CarList 
             cars={cars}
             setCars={setCars}
             setEditCar={setEditCar}
             />
             
            </div>
          
          </div>
        )
    }

export default Visualize;