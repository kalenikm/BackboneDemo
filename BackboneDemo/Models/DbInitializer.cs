using System.Collections.Generic;
using System.Data.Entity;

namespace BackboneDemo.Models
{
    public class DbInitializer : DropCreateDatabaseAlways<BackboneDemoContext>
    {
        public override void InitializeDatabase(BackboneDemoContext context)
        {
            context.Students.AddRange(new List<Student>()
            {
                new Student() {Name = "Misha", Age = 20},
                new Student() {Name = "Pasha", Age = 19},
                new Student() {Name = "Olya", Age = 20},
                new Student() {Name = "Nastya", Age = 19},
                new Student() {Name = "Igor", Age = 21}
            });

            context.SaveChanges();
        }
    }
}