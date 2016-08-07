using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebPortal.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult GetProducts(int pageIndex = 1, int pageSize = 5)
        {
            var prods = new List<ProductEntity>();

            for (int i = pageIndex; i <= pageIndex * pageSize; i++)
            {
                prods.Add(new ProductEntity
                {
                    Id = i,
                    Name = "Product " + i,
                    Description = "Product Description " + i,
                    CostPrice = i * 10,
                    Price = i * 5,
                    MeasUnits = new MeasUnitEntity { MeasUnit_Guid = Guid.NewGuid(), Name = "", ShortName = "" },
                    ProductTypes = new ProductTypeEntity { Name = "", Description = "" }
                });
            }
            return Json(prods, JsonRequestBehavior.AllowGet);
        }

    }

    public class ProductEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? CostPrice { get; set; }
        public int? Price { get; set; }
        public MeasUnitEntity MeasUnits { get; set; }
        public ProductTypeEntity ProductTypes { get; set; }
    }

    public class MeasUnitEntity
    {
        public System.Guid MeasUnit_Guid { get; set; }
        public string ShortName { get; set; }
        public string Name { get; set; }
    }

    public partial class ProductTypeEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}