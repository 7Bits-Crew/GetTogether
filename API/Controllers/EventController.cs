using API.Models;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<ActionResult<List<Event>>> AddEvent([FromBody] Event value)
        {
            value.Id = Guid.Empty;
            List<EventType> types = new List<EventType>();
            foreach (var eventtype in value.Type) {
                EventType? e = _context.EventTypes.FirstOrDefault(t => t.Id == eventtype.Id + 1);
                if (e is not null)
                    types.Add(e);
            }
            value.Type = types;
            _context.Events.Add(value);
            await _context.SaveChangesAsync();
            return Ok(await _context.Events.ToArrayAsync());
        }

    }
}
