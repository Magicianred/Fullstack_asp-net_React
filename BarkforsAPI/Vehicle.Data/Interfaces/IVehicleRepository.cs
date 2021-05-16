using System.Collections.Generic;
using Vehicle.Data.Models;

namespace Vehicle.Data.Interfaces
{
    public interface IVehicleRepository
    {
        public List<Car> getVehicle();// change name to vehicles
        public Car searchCar(int id);
        public string createCar(Car car);
        public string updateCar(Car car);
        public string deleteCar(int id);
     

    }
}
