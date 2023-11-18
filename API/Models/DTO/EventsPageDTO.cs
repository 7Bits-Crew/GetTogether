namespace API.Models.DTO
{
    public class EventsPageDTO
    {
        public List<Event>? Events { get; set; }
        public int Page {  get; set; }
        public int PageCount { get; set; }
        public int PageSize { get; set; }
    }
}
