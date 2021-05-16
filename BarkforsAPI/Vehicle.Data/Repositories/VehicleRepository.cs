using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using Vehicle.Data.DataAccess;
using Vehicle.Data.Interfaces;
using Vehicle.Data.Models;
using static Vehicle.Data.DataAccess.SqlDataAccess;
namespace Vehicle.Data.Repositories
{
    [DataContract]
    public class VehicleRepository : IVehicleRepository
    {
        private SqlDataAccess sqlda = new SqlDataAccess(); 

        public  List<Car> getVehicle() //int VIN
        {

            List<Car> temp = new List<Car>();
         
            foreach (Car car in sqlda.GetCars())
            { 
                car.Brand  = ListData.Instance.Brands.ContainsKey(car.VIN) ?  ListData.Instance.Brands[car.VIN] : null;
                car.Color = ListData.Instance.Brands.ContainsKey(car.VIN) ? ListData.Instance.Colors[car.VIN] : null;
                car.VehicleEquipment = ListData.Instance.Brands.ContainsKey(car.VIN) ? ListData.Instance.VehicleEquipments[car.VIN] : null;
                car.Fuel = ListData.Instance.Fuels.ContainsKey(car.VIN) ? ListData.Instance.Fuels[car.VIN] : null;
                temp.Add(car);
            }

            return temp;
        }
        
        public string createCar(Car car)
        {
            int carVin = car.VIN;

            if (ListData.Instance.Colors.ContainsKey(carVin))
            {
                //returns 0, indicating an error, since server already has an entry with that Vehicle Identification Number.
                return "0";
            }

            //Add color to dictionary || list
            ListData.Instance.Colors.Add(carVin, new Color{
                VIN = car.VIN,
                Name = car.Color.Name
            });

            //Add brand to dictionary || list
            ListData.Instance.Brands.Add(carVin, new Brand{
                VIN = car.VIN,
                Name = car.Brand.Name
            });

            //Add vehicleEquipments to dictionary || list
            ListData.Instance.VehicleEquipments.Add(carVin, new VehicleEquipment {
                VIN = car.VIN,
                HasParkingSensor = car.VehicleEquipment.HasParkingSensor,
                HasRearViewCamera = car.VehicleEquipment.HasRearViewCamera,
                HasLeatherSeats = car.VehicleEquipment.HasLeatherSeats
            });

            //Add vehicleEquipments to dictionary || list
            ListData.Instance.Fuels.Add(carVin, new Fuel{
                VIN = car.VIN,
                Name = car.Fuel.Name
            });

            //insert into database
            return sqlda.addCar(car);
        }


        public Car searchCar(int id)
        {
            return sqlda.searchCar(id);
        }

        public string updateCar(Car car)
        {
            return sqlda.updateCar(car);
        }

        public string deleteCar(int id)
        {
            return "The car with VIN: " + sqlda.deleteCar(id) + " was deleted";
        }

    }
}
