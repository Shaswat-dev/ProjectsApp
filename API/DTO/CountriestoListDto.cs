using System.Collections.Generic;
using API.Model;

namespace API.DTO
{
    public class CountriestoListDto
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }

        public virtual ICollection<AddCitiesDto> Cities { get; set; }
    }
}