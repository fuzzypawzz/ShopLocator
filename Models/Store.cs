using System;
using System.ComponentModel.DataAnnotations;

namespace ShopLocator.Models
{
    public class Store
    {
        public int ID { get; set; }

        public string Name { get; set; }

        public string Street { get; set; }

        public int Housenumber { get; set; }

        public int Zipcode { get; set; }

        public string City { get; set; }

        public int Phonenumber { get; set; }
    }
}