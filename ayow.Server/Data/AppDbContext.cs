using Microsoft.EntityFrameworkCore;
using ayow.Server.Models;

namespace ayow.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Word> Words { get; set; }

        public DbSet<DailyWord> DailyWords { get; set; }
    }
}
