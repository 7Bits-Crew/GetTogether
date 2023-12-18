using API.Models;
using API.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        [HttpGet("all")]
        public async Task<ActionResult<List<EventType>>> All()
        {
            var list = _context.EventTypes.ToList();
            return Ok(list);
        }
        public CategoriesController(DataContext context)
        {
            _context = context;
        }
        private DataContext _context;
    }
}
