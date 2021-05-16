import React, { useEffect } from "react";
import axios from 'axios';
import './CarListForm.css';
import BarkforsLogo from "../../assets/BARKFORS.png";
const CarListForm = ({input, setInput, cars, setCars, editCar, setEditCar}) =>{


function updateCar(input){ 
  const {vin, licencePlateNbr, brand, color, fuel, modelName, hasParkingSensor, hasRearViewCamera, hasLeatherSeats  } = input
    //SEARCH FOR CAR
    const newCar =  cars.map((car) =>(
        car.vin === vin ? {vin: vin,licencePlateNbr: licencePlateNbr,brand: brand, color: color,fuel: fuel,modelName: modelName,
          hasParkingSensor:hasParkingSensor,hasRearViewCamera: hasRearViewCamera,hasLeatherSeats: hasLeatherSeats  } : car
    ))
      // DELETE THE CURRENT CAR BY FILTER
      setCars(cars.filter((car) => car.vin !== vin));
      // ADD THE NEW MODIFIED CAR
     setCars(newCar);
     //SET ALL INPUTS TO EMPTY
     setEditCar("");

     //UPDATE CAR AT SERVER     
     axios.put('/Vehicle',{
      vin: vin,
      licencePlateNbr: licencePlateNbr,
      modelName:modelName,
      brand: {
        vin: vin,
        name:brand
      },
      color: {
         vin: vin,
        name: color
      },
      vehicleEquipment: {
        vin: vin,
        hasParkingSensor: hasParkingSensor,
        hasRearViewCamera:hasRearViewCamera,
        hasLeatherSeats: hasLeatherSeats
      },
      fuel: {
        vin: vin,
        name: fuel
      }})
    .then(result => {
      console.log('Result from server: ' + result.data) 
    })
    .catch(error => console.log(error));
     
}

useEffect(() => {
  if(editCar){
    setInput( {
      vin: editCar.vin,
      licencePlateNbr: editCar.licencePlateNbr,
      brand: editCar.brand,
      color: editCar.color,
      fuel: editCar.fuel,
      modelName: editCar.modelName,
      hasParkingSensor: editCar.hasParkingSensor,
      hasRearViewCamera: editCar.hasRearViewCamera,
      hasLeatherSeats: editCar.hasLeatherSeats    
  })
  }else{
    setInput({vin: "",licencePlateNbr:"",brand: "",color: "",fuel: "",
    modelName: "",hasParkingSensor: false,hasRearViewCamera: false,hasLeatherSeats: false});
  }
},[setInput, editCar]); //each time we set input, editCar, this will trigger!

  function onSubmit(e) {
    e.preventDefault();
    if(!editCar){

      if(!validateInput(input)){ // VALIDATE INPUT || if car already exist then return
          return;
      } 

         axios.post('/Vehicle',{
            vin: input.vin,
            licencePlateNbr: input.licencePlateNbr,
            modelName:input.modelName,
            brand: {
              vin: input.vin,
              name: input.brand
            },
            color: {
               vin: input.vin,
              name: input.color
            },
            vehicleEquipment: {
              vin: input.vin,
              hasParkingSensor: input.hasParkingSensor,
              hasRearViewCamera: input.hasRearViewCamera,
              hasLeatherSeats: input.hasLeatherSeats
            },
            fuel: {
              vin: input.vin,
              name: input.fuel
            }
          })
          .then(result => {
            console.log('Result from server: ' + result.data) //show this message!
            if(result.data == "0"){
              console.log('server already has an entry with that Vehicle Identification Number (VIN)!')
              return
            }else{

            //GET: GET ALL VEHICLES FORM SERVER
            axios.get('/Vehicle')
            .then(result =>{
              setCars(filterIncoming(result.data));
            }).catch(error => console.log('Error: ' + error));
            }

          })
          .catch(error => console.log(error)); 
    
          //RESETS THE USERS INPUT
          setInput({vin: "",licencePlateNbr:"",brand: "",color: "",fuel: "",
          modelName: "", hasParkingSensor: false, hasRearViewCamera: false, hasLeatherSeats: false}); 
    }else{
        updateCar(input)
    }

  }

    function onChangeBool(e) {
        const { checked } = e.target
        setInput({...input,[e.target.name]: checked });
    }

    function onChange(e){
    setInput({...input,[e.target.name]:e.target.value})
    }

    return(
        <>
        <div className="img-container" >
        <img  src={BarkforsLogo}  alt="Barkfors"/>
        </div>

            <div onSubmit={onSubmit}>
             <form>
             <div className="car-details">

             <div className="input-container">
             <div className="input-box">
                <input
                type="text"
                name="vin"
                value={input.vin}
                placeholder="Enter VIN"
                className="data-input"
                onChange={onChange}
                />
               </div>

                <div className="input-box">
                <input
                type="text"
                name="licencePlateNbr"
                value={input.licencePlateNbr}
                placeholder="Enter licence plate number"
                className="data-input"
                onChange={onChange}
                />
                </div>

                <div className="input-box">
                <input
                type="text"
                name="brand"
                value={input.brand}
                placeholder="Enter brand"
                className="data-input"
                onChange={onChange}
                />
               </div>

               <div className="input-box">
                <input
                type="text"
                name="color"
                value={input.color}
                placeholder="Enter color"
                className="data-input"
                onChange={onChange}
                />
              </div>

              <div className="input-box">
                <input
                type="text"
                name="fuel"
                value={input.fuel}
                placeholder="Enter fuel type"
                className="data-input"
                onChange={onChange}   
                />
              </div>

              <div className="input-box">
                <input
                type="text"
                name="modelName"
                value={input.modelName}
                placeholder="Enter model"
                className="data-input"
                onChange={onChange}   
                />    
              </div>  

                <div className="checkbox-detail checkbox">
                <input type="checkbox"
                value={input.hasParkingSensor}
                checked={input.hasParkingSensor}
                name="hasParkingSensor"
                onChange={onChangeBool}/>
                <label htmlFor="hasParkingSensor">Parking Sensor</label>

                <input type="checkbox"
                value={input.hasRearViewCamera}  //value
                checked={input.hasRearViewCamera} //visual
                name="hasRearViewCamera"
                onChange={onChangeBool}/>
                <label htmlFor="hasRearViewCamera">Rear View Camera</label>

                <input type="checkbox"
                value={input.hasLeatherSeats}
                checked={input.hasLeatherSeats}
                name="hasLeatherSeats"
                onChange={onChangeBool}/>
                <label htmlFor="hasLeatherSeats">Leather Seats</label>
                </div>

                <div className="buttons-container">
                <button 
                type="submit"
                className="button-add"
                >Add
                </button> 
                
                </div>
                 </div>
                </div>
             </form>
             </div>
            
        </>

    )
}

function validateInput(input){
var emptyFields;  
for(var i in input){
  if(i === 'hasLeatherSeats' || i === 'hasRearViewCamera' || i === 'hasParkingSensor'){
    continue
  }
  if (!input[i]){
    emptyFields += i + ": is empty\n"
  }
}
if(emptyFields){
  console.log('Empty fields!\n' + emptyFields)// display this !
  return false
}else{
  return true
}
}

function filterIncoming(data){
  var filteredArray = [] ;
  for(let i = 0; i < data.length;i++){
   var object = {
      vin: data[i].vin,
      licencePlateNbr: data[i].licencePlateNbr,
      brand: data[i].brand.name,
      color: data[i].color.name,
      fuel: data[i].fuel.name,
      modelName: data[i].modelName,
      hasParkingSensor: data[i].vehicleEquipment.hasParkingSensor,
      hasRearViewCamera: data[i].vehicleEquipment.hasRearViewCamera,
      hasLeatherSeats:  data[i].vehicleEquipment.hasLeatherSeats, 
    }
    filteredArray.push(object)
  }
return filteredArray;
}

export default CarListForm;



