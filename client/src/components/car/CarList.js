import React from "react";
import './CarList.css'
import axios from 'axios';


const CarList = ({cars, setCars, setEditCar}) => {

    const handleEdit = (carVin) => { 
        const findCar = cars.find((car) => car.vin === carVin);
        setEditCar(findCar) //car to edit
    }

    const handleDelete = (carVin) => {
        setCars(cars.filter((car) => car.vin !== carVin)); //set all cars except from this one (= removing it)

        axios.delete(`/Vehicle/${carVin}`) // remove if from server
        .then(result =>{
          console.log('Result from the server: ' + result.data) //display this as a message!
        }).catch(error => console.log('Error: ' + error));
    }

    return(
        <div className="scroll">
      <table>
        <tr>
          <th>VIN</th>
          <th>Licence plate</th>
          <th>Model name</th>
          <th>Color</th>
          <th>Parking sensor</th>
          <th>Rear view camera</th>
          <th>Leather seats</th>
          <th>Fuel type</th>
        </tr>
            {cars.map((car) => (

                <tr className="table-row" key={car.vin}>
                   <td>{`${car.vin}`}</td>
                   <td>{`${car.licencePlateNbr}`}</td>
                   <td>{`${car.modelName}`}</td>
                   <td>{`${car.color}`}</td>
                   <td>{`${car.hasParkingSensor}`}</td>
                   <td>{`${car.hasRearViewCamera}`}</td>
                   <td>{`${car.hasLeatherSeats}`}</td>
                   <td>{`${car.fuel}`}</td>

                   <td>  
                   <button className="button-edit task-button" onClick={() => handleEdit(car.vin)}>
                        edit
                    </button>
                    </td>

                   <td>
                   <button className="button-delete task-button" onClick={() => handleDelete(car.vin)}>
                        delete
                    </button>
                   </td>
               </tr>
                  
             
            ))}
            </table>
        </div>
    )
}

export default CarList;
/*

<li className="list-item" key={car.vin}>

                  
                    <input
                        type="text" 
                        value={`${car.vin}`}
                        className="list"
                        onChange={(event)=> event.preventDefault()}
                    />
                 
                    <input 
                        type="text"
                        value={`${car.licencePlateNbr}`}
                        className="list"
                        onChange={(event)=> event.preventDefault()}
                    />
                    
                      <input 
                        type="text"
                        value={`${car.modelName}`}
                        className="list"
                        onChange={(event)=> event.preventDefault()}
                    />
                      <input 
                        type="text"
                        value={`${car.color}`}
                        className="list"
                        onChange={(event)=> event.preventDefault()}
                    />
                      <input 
                        type="text"
                        value={`${car.hasParkingSensor}`}
                        className="list"
                        onChange={(event)=> event.preventDefault()}
                    />
                      <input 
                        type="text"
                        value={`${car.hasRearViewCamera}`}
                        className="list"
                        onChange={(event)=> event.preventDefault()}
                    />
                      <input 
                        type="text"
                        value={`${car.hasLeatherSeats}`}
                        className="list"
                        onChange={(event)=> event.preventDefault()}
                    />
                      <input 
                        type="text"
                        value={`${car.fuel}`}
                        className="list"
                        onChange={(event)=> event.preventDefault()}
                    />
                    
                    <button className="button-edit task-button" onClick={() => handleEdit(car.vin)}>
                        edit
                    </button>
                    <button className="button-delete task-button" onClick={() => handleDelete(car.vin)}>
                        delete
                    </button>
               
                </li>

*/