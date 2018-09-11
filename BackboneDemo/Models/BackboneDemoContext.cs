using System.Data.Entity;

namespace BackboneDemo.Models
{
    public class BackboneDemoContext : DbContext
    {
        public BackboneDemoContext() : base("BackboneDemoContext") { }

        public DbSet<Student> Students { get; set; }
    }
}
