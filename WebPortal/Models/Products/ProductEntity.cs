using System.Collections.Generic;

namespace WebPortal.Models.Products
{
    public class ProductEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? CostPrice { get; set; }
        public int? Price { get; set; }
        public MeasUnitEntity MeasUnits { get; set; }
        public ProductTypeEntity ProductTypes { get; set; }
        public List<string> ImageUrls { get; set; }
    }
}