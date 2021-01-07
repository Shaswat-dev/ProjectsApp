using System.Collections.Generic;
using API.Model;
namespace API.DTO
{
    public class CitiestoListDto
    {
       

        public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public int CountryId { get; set; }

       
        public virtual ICollection<ProjectDto> Projects { get; set; }
    }
}