using System.Collections.Generic;
using API.Model;
namespace API.DTO
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public int CityId { get; set; }
        public bool IsActive { get; set; }

        //public virtual AddCitiesDto City { get; set; }
    }
}