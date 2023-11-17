namespace API.Models
{
    [PrimaryKey("Id")]
    public class EventType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhotoSource { get; set; }
        public List<Event>? Events { get; set; }
    }
}
