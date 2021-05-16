using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Vehicle.Data.Interfaces;
using Vehicle.Data.Models;
using Vehicle.Data.Repositories;

namespace Ali_Muhammed_Assignment_BarkforsAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private VehicleRepository iv = new VehicleRepository();


        [HttpPost]
        public string createCar([FromBody] Car car)
        {
            return iv.createCar(car);
        }


        [HttpPost("{id}")]
        public Car searchCar(int id)
        {
            return iv.searchCar(id);
        }

        [HttpGet]
        public List<Car> getCar() // change name to getCars and getVehicle to get vehicles
        {
            return iv.getVehicle();
        }

        [HttpPut]
        public string updateCar([FromBody] Car car)
        {
            return iv.updateCar(car);
        }
        
        [HttpDelete("{id:int}")]
        public  string DeleteVehicle(int id)

        {
            
            return  iv.deleteCar(id);
        }


    }
}
