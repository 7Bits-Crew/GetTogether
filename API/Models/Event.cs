using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("Event")]
    [PrimaryKey("Id")]
    public class Event
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        [StringLength(200)]
        public string Place { get; set; }
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [StringLength(500)]
        public string? Description { get; set; }
        public List<EventType> Type { get; set; }
        public bool publicEvent { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int Participants { get; set; }
        public bool SaveTemplate { get; set; }
        public bool Online { get; set; }
        public string LinkInput { get; set; }
    }
}



