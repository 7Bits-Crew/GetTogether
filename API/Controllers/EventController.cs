using API.Models;
using API.Models.DTO;
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

        [HttpPost("add")]
        public async Task<ActionResult<string>> AddEvent([FromBody] Event value)
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
            var ok = new { ok="ok" };
            return Ok(ok);
        }

        [HttpGet("get/all")]
        public async Task<ActionResult<List<Event>>> GetAll() {
            List<Event> events = await _context.Events.ToListAsync();
            foreach(Event e in events)
            {
                e.Type = await _context.EventTypes.Where(k => k.Events.Contains(e)).ToListAsync();
                e.Photo = "default.webp";
            }
            
            return Ok(events);
            
        }

        [HttpGet("get/page")]
        public async Task<ActionResult<EventsPageDTO>> GetPage(int page, int size)
        {
            if (page < 1) {
                return BadRequest("Номер сторінки має бути більше нуля");
            }
            if (size < 1) {
                return BadRequest("Розмір сторінки має бути більше нуля");

            }
            List<Event> events = await _context.Events.Skip((page-1)* size).Take(size).ToListAsync();
            foreach (Event e in events)
            {
                e.Type = await _context.EventTypes.Where(k => k.Events.Contains(e)).ToListAsync();
                e.Photo = "default.webp";
            }
            var dto = new EventsPageDTO();
            dto.PageCount = _context.Events.Count() / size;
            if (_context.Events.Count() % size != 0)
                dto.PageCount++;
            dto.Events = events;
            dto.Page = page;
            dto.PageSize = size;

            return Ok(dto);

        }

    }
}
