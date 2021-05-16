using Newtonsoft.Json.Linq;
using System;

namespace Vehicle.Data.Models
{
    public class VehicleEquipment
    {
        public int VIN { get; set; }
        public  bool HasParkingSensor { get; set; }
        public bool HasRearViewCamera { get; set; }
        public bool HasLeatherSeats { get; set; }

    }
}
