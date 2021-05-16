using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Vehicle.Data.Models
{
    public class Car
    {
        

        public int VIN { get; set; }
        public String LicencePlateNbr { get; set; }
        public String ModelName { get; set; } // implementera



        //Brand object
        public Brand Brand { get; set; }
        //Color object
        public Color Color { get; set; }
        //VehicleEquipment object
        public VehicleEquipment VehicleEquipment { get; set; }
        // Fuel object
        public Fuel Fuel { get; set; } // implementera
        
    }
}
