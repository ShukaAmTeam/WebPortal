using System;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace WebPortal.Controllers
{
    [RoutePrefix("api/Products")]
    public class ProductsController : ApiController
    {
        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAllProducts()
        {
            var prods = FakeProductsList.Products;

            var totalCount = FakeProductsList.Products.Count;
            var totalPages = totalCount;

            var paginationHeader = new
            {
                TotalCount = totalCount,
                TotalPages = totalPages
            };

            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination",
                Newtonsoft.Json.JsonConvert.SerializeObject(paginationHeader));

            return Ok(prods);
        }

        //[HttpGet]
        //[Route("")]
        //public IHttpActionResult GetProducts(int pageIndex = 1, int pageSize = 5)
        //{
        //    var prods = FakeProductsList.Products.Skip(pageIndex).Take(pageSize);

        //    var totalCount = FakeProductsList.Products.Count;
        //    var totalPages = (int) Math.Ceiling((double) totalCount/pageSize);

        //    var urlHelper = new System.Web.Http.Routing.UrlHelper((HttpRequestMessage) System.Web.HttpContext.Current.Items["MS_HttpRequestMessage"]);
        //    var prevLink = pageIndex > 0 ? urlHelper.Link("GetProducts", new {pageIndex = pageIndex - 1, pageSize = pageSize}) : "";
        //    var nextLink = pageIndex < totalPages - 1 ? urlHelper.Link("GetProducts", new {pageIndex = pageIndex + 1, pageSize = pageSize}) : "";

        //    var paginationHeader = new
        //    {
        //        TotalCount = totalCount,
        //        TotalPages = totalPages,
        //        PrevPageLink = prevLink,
        //        NextPageLink = nextLink
        //    };

        //    System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination",
        //        Newtonsoft.Json.JsonConvert.SerializeObject(paginationHeader));

        //    return Ok(prods);
        //}

        [HttpGet]
        [Route("Types")]
        public IHttpActionResult GetProductTypes()
        {
            var prodTypes = FakeProductsList.Products.Select(p=>p.ProductTypes);
            
            return Ok(prodTypes);
        }
    }
}
