using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vehicle.Data.Models;

namespace Vehicle.Data.DataAccess
{
   public class SqlDataAccess

    { 
       private string connectionString = "Server=localhost;Database=vehiclesdb;User Id = user1; Password=root1";
       public List<Car> cars = new List<Car>();
        public List<Car> GetCars()
        { 
            using(SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SELECT * from Cars ", sqlConnection))
                {
                    try
                    {
                        sqlConnection.Open();

                        using (SqlDataReader dataReader = sqlCommand.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                //we dont include dataReader[2] since its database specific value (carID key)    
                                cars.Add(new Car { VIN = (int)dataReader[0], LicencePlateNbr = dataReader.GetString(1), ModelName = dataReader.GetString(3)});
                            }
                        }                  
                    }
                    catch (SqlException ex)
                {
                        System.Diagnostics.Debug.WriteLine(ex);
                        Console.WriteLine(ex);
                }
                }
            }
            return cars;
        }

        public string addCar(Car car)
        {
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand("INSERT INTO Cars (VIN, LicencePlateNbr, ModelName) VALUES(@VIN, @LicencePlateNbr, @ModelName);", sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@VIN", car.VIN);
                    sqlCommand.Parameters.AddWithValue("@LicencePlateNbr", car.LicencePlateNbr);
                    sqlCommand.Parameters.AddWithValue("@ModelName", car.ModelName);
                    sqlCommand.Connection = sqlConnection;
                    try
                    {
                        sqlConnection.Open();
                        sqlCommand.ExecuteNonQuery();
                    }
                    catch (SqlException ex)
                    {
                        System.Diagnostics.Debug.WriteLine(ex);
                        Console.WriteLine(ex);
                    }
                }
            }
            return "The car with VIN: " + car.VIN + " was successfully added!";
        }

        public string updateCar(Car car)
        {
            //We won't update VIN, else we will lose connection to the car components in list (brand,color,fuel,vehicleEquipment)
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            { 
                using (SqlCommand sqlCommand = new SqlCommand("UPDATE Cars SET LicencePlateNbr = @LicencePlateNbr, ModelName = @ModelName WHERE VIN = @VIN;", sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@VIN", car.VIN);
                    sqlCommand.Parameters.AddWithValue("@LicencePlateNbr", car.LicencePlateNbr);
                    sqlCommand.Parameters.AddWithValue("@ModelName", car.ModelName);
                    sqlCommand.Connection = sqlConnection;
                    try
                    {
                        sqlConnection.Open();
                        sqlCommand.ExecuteNonQuery();
                    }
                    catch (SqlException ex)
                    {
                        System.Diagnostics.Debug.WriteLine(ex);
                        Console.WriteLine(ex);
                    }
                }
            }
            return "The car with the VIN: " + car.VIN + " was successfully updated! ";
        }

        public int deleteCar(int id)
        {
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand("DELETE FROM Cars WHERE VIN = @VIN;", sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@VIN", id);
                    sqlCommand.Connection = sqlConnection;
                    try
                    {
                        sqlConnection.Open();
                        sqlCommand.ExecuteNonQuery();
                    }
                    catch (SqlException ex)
                    {
                        System.Diagnostics.Debug.WriteLine(ex);
                        Console.WriteLine(ex);
                    }
                }
            }
            return id;
        }


        public Car searchCar(int id) 
        {
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                using (SqlCommand sqlCommand = new SqlCommand("SELECT * FROM cars WHERE cars.VIN = @VIN", sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@VIN", id);
                    sqlCommand.Connection = sqlConnection;
                    try
                    {
                       sqlConnection.Open();
                       sqlCommand.ExecuteNonQuery();

                        using (SqlDataReader dataReader = sqlCommand.ExecuteReader())
                        {
                            while (dataReader.Read())
                            {
                                //we dont include dataReader[2] since its database specific value (carID key)    
                                return new Car { VIN = (int)dataReader[0], LicencePlateNbr = dataReader.GetString(1), ModelName = dataReader.GetString(3) };
                                
                            }
                        }

                    }
                    catch (SqlException ex)
                    {
                        System.Diagnostics.Debug.WriteLine(ex);
                        Console.WriteLine(ex);
                    }
                }
            }
            return null ; 
        }
    }

}

