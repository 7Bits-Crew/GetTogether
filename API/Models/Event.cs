namespace API.Models
{
    public class Event
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public EventType Type { get; set; }
        public PrivacyType Privacy { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Place { get; set; }
        public int? MembersCount { get; set; }
        public int? MembersCountMin { get; set; }
        public int? MembersCountMax { get; set; }
        

    }
}



