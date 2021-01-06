namespace API.DTO
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public int CityId { get; set; }
        public int IsActive { get; set; }
    }
}