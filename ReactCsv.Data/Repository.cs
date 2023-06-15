using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactCsv.Data
{
    public class Repository
    {
        private string _connectionString;

        public Repository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddPeople(List<Person> people)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.AddRange(people);
            context.SaveChanges();
        }

        public void Delete()
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.RemoveRange(context.People);
            context.SaveChanges();
        }

        public List<Person> GetPeople( )
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }
    }
}
