using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vehicle.Data.Models;

namespace Vehicle.Data.DataAccess
{
   public class ListData
    {

        //Dictionaries holding server persistent data - access is Big O(1) access
        public  Dictionary<int, Brand> Brands = new Dictionary<int, Brand>();
        public  Dictionary<int, Color> Colors = new Dictionary<int, Color>();
        public Dictionary<int, Fuel> Fuels = new Dictionary<int, Fuel>();
        public  Dictionary<int, VehicleEquipment> VehicleEquipments = new Dictionary<int, VehicleEquipment>();
        

        private static ListData _instance = null;
        private static object chekLock = new object();
        private ListData()
        { }

        public static ListData Instance
        {
            get
            {
                lock (chekLock)
                {
                    if (_instance == null)
                        _instance = new ListData();
                    return _instance;
                }
            }
        }


      

        //  public static List<Car> Cars { get { return Cars; } }
        // public static List<Brand> Brands { get { return Brands; } }
        //public static List<Color> Colors { get { return Colors; } }

        //public static List<VehicleEquipment> VehicleEquipments { get { return VehicleEquipments; } }

    }
}
