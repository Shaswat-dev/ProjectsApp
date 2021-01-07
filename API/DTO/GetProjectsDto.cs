using API.Model;

namespace API.DTO


{
    public class GetProjectsDto
    {
         public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public int CityId { get; set; }
        public bool IsActive { get; set; }

        
    }
}