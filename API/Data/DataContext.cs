using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> opt): base(opt) { }
        public DbSet<Event> Events { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
