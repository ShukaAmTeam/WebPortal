using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebPortal.Models.Products;

namespace WebPortal.Controllers
{
    public class FakeProductsList
    {
        public static List<ProductEntity> Products
        {
            get
            {
                //if (Products != null) return Products;

                var prods = new List<ProductEntity>();

                for (int i = 1; i <= 30; i++)
                {
                    prods.Add(new ProductEntity
                    {
                        Id = i,
                        Name = $"Product {i} Title",
                        Description =
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, omnis illo iste ratione. Numquam eveniet quo, ullam itaque expedita impedit. Eveniet, asperiores amet iste repellendus similique reiciendis, maxime laborum praesentium.",
                        CostPrice = i*10,
                        Price = i*5,
                        MeasUnits = new MeasUnitEntity {MeasUnit_Guid = Guid.NewGuid(), Name = "", ShortName = ""},
                        ImageUrls = new List<string>
                        {
                            $"/img/content-filter/img-{i}.jpg",
                            $"/img/product-quick-view/item-1.jpg",
                            $"/img/product-quick-view/item-2.jpg",
                            $"/img/product-quick-view/item-3.jpg"
                        },
                        ProductTypes = new ProductTypeEntity
                        {
                            Id = i,
                            Name = $"Type {i}",
                            DataFilter = $"type{i}",
                            Description = $"Type {i} description"
                        }
                    });
                }
                return prods;
            }
        }
    }
}