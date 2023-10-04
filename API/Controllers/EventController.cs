using API.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private DataContext _context;
        public EventController(DataContext context)
        {
            _context = context;
        }
        // POST api/<EventController>
        [HttpPost]
        public async Task<ActionResult<List<Event>>> Post([FromBody] Event value)
        {
            value.Id = Guid.Empty;
            _context.Events.Add(value);
            await _context.SaveChangesAsync();
            return Ok(await _context.Events.ToArrayAsync());
        }

    }
}
