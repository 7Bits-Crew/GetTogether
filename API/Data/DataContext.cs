using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;

namespace API.Data
{
    public class DataContext:DbContext
    {
        
        public DbSet<Event> Events { get; set; }
        public DbSet<EventType> EventTypes { get; set; }
        public DbSet<User> Users { get; set; }

        public DataContext(DbContextOptions<DataContext> opt) : base(opt)
        {
            try {
                var databaseCreator = Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;
                if (databaseCreator is not null) {
                    if (!databaseCreator.CanConnect()) databaseCreator.Create();
                    if (!databaseCreator.HasTables()) databaseCreator.CreateTables();
                }
            }  
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>(entity => {
                entity.HasIndex(e => e.Email).IsUnique();
            });
            builder.Entity<EventType>().HasData(new EventType { Id = 1, Name="Sport", PhotoSource="Sport.webp" }, new EventType { Id = 2, Name = "Music", PhotoSource = "Music.webp" }, new EventType { Id = 3, Name = "Party", PhotoSource = "Party.webp" });
        }
        
    }
}
