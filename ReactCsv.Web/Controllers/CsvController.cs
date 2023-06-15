using CsvHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactCsv.Data;
using ReactCsv.Web.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactCsv.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CsvController : ControllerBase
    {
        private string _connectionString;

        public CsvController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("generate")]
        public IActionResult Generate(int count)
        {
            var people = GeneratePeople(count);
            
            var builder = new StringBuilder();
            var stringWriter = new StringWriter(builder);
            using var csv = new CsvWriter(stringWriter, CultureInfo.InvariantCulture);
            csv.WriteRecords(people);
            var csvpeople = builder.ToString();
            byte[] bytes = Encoding.UTF8.GetBytes(csvpeople);
            //return File(bytes, "text/csv", "people.csv");
            return File(bytes, "APPLICATION/octet-stream", "people.csv");
        }
        [HttpGet]
        [Route("getpeople")]
        public List<Person> GetPeople()
        {
            var repo = new Repository(_connectionString);
            return repo.GetPeople();

        }

        [HttpPost]
        [Route("delete")]
        public  void Delete()
        {
            var repo = new Repository(_connectionString);
            repo.Delete();

        }

        [HttpPost]
        [Route("upload")]
        public void Upload(UploadVM vm)
        {

            int index = vm.Base64.IndexOf(",") + 1;
            string newBase64 = vm.Base64.Substring(index);

            byte[] csvBytes = Convert.FromBase64String(newBase64);
            List<Person> ppl=GetfromCsvBytes(csvBytes);
            var repo = new Repository(_connectionString);
            repo.AddPeople(ppl);
        }
        public List<Person> GetfromCsvBytes(byte[] csvBytes)
        {       

            using var memoryStream = new MemoryStream(csvBytes);
            var streamReader = new StreamReader(memoryStream);
            using var reader = new CsvReader(streamReader, CultureInfo.InvariantCulture);
            return reader.GetRecords<Person>().ToList();
        }


    
        public void GetfromCsv(string csv)
        {

            int index = csv.IndexOf(",") + 1;
            string base64 = csv.Substring(index);

            var stringReader = new StringReader(base64);
            using var reader = new CsvReader(stringReader, CultureInfo.InvariantCulture);
            var ppl = reader.GetRecords<Person>().ToList();
            var repo = new Repository(_connectionString);
            repo.AddPeople(ppl);

        }


        public List<Person> GeneratePeople(int count)
        {

            List<Person> result = new();
            for (int i = 1; i <= count; i++)
            {
                result.Add(new Person
                {
                    FirstName = Faker.Name.First(),
                    LastName = Faker.Name.Last(),
                    Age = Faker.RandomNumber.Next(20, 100),
                    Email = Faker.Internet.Email(),
                    Address = Faker.Address.StreetAddress(),

                });

            }
            return result;
        }


    }
}
