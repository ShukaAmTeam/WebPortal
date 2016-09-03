using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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
   
        public JsonResult GetProducts(int page = 1)
        {
            var prods = new List<ProductEntity>();

            for (int i = 1 + ((page - 1)*10); i <= page*10; i++)
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
            return Json(prods, JsonRequestBehavior.AllowGet);
        }

  
        [HttpGet]
        [Route("api/Home/GetProducts", Name = "GetProducts")]
        public JsonResult GetProducts(int pageIndex = 1, int pageSize = 5)
        {
            var prods = FakeProductsList.Products.Skip(pageIndex).Take(pageSize);

            var totalCount = FakeProductsList.Products.Count;
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            var urlHelper = new System.Web.Http.Routing.UrlHelper((HttpRequestMessage)System.Web.HttpContext.Current.Items["MS_HttpRequestMessage"]);
            var prevLink = pageIndex > 0 ? urlHelper.Link("GetProducts", new { pageIndex = pageIndex - 1, pageSize = pageSize }) : "";
            var nextLink = pageIndex < totalPages - 1 ? urlHelper.Link("GetProducts", new { pageIndex = pageIndex + 1, pageSize = pageSize }) : "";

            var paginationHeader = new
            {
                TotalCount = totalCount,
                TotalPages = totalPages,
                PrevPageLink = prevLink,
                NextPageLink = nextLink
            };

            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination",
            Newtonsoft.Json.JsonConvert.SerializeObject(paginationHeader));

            return Json(prods, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetProductTypes(int pageIndex = 1, int pageSize = 5)
        {
            var prodTypes = new List<ProductTypeEntity>();

            for (int i = pageIndex; i <= pageIndex * pageSize; i++)
            {
                prodTypes.Add(new ProductTypeEntity
                {
                    Id = i,
                    Name = $"Type {i}",
                    DataFilter = $"type{i}",
                    Description = $"Type {i} description"
                });
            }
            return Json(prodTypes, JsonRequestBehavior.AllowGet);
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
        public List<string> ImageUrls { get; set; }
    }

    public class MeasUnitEntity
    {
        public System.Guid MeasUnit_Guid { get; set; }
        public string ShortName { get; set; }
        public string Name { get; set; }
    }

    public partial class ProductTypeEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DataFilter { get; set; }
        public string Description { get; set; }
    }
}