using API.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {

        // POST api/<EventController>
        [HttpPost]
        public void Post([FromBody] Event value)
        {
            Console.WriteLine($"Прийнято об'єкт: {value.Name}");
        }

    }
}
