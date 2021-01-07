using System.Linq;
using AutoMapper;
using API.DTO;
using API.Model;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            
            CreateMap<ProjectDto, Projects>();
          
              CreateMap<Projects, ProjectDto>();

            /*  CreateMap<Projects, GetProjectsDto>().ForMember(dest => dest.City, opt =>
                {
                    opt.MapFrom(src => src.CityId.Equals(dest));
                });
            */

            /*CreateMap<Cities,CitiestoListDto>().ForMember(dest => dest.Projects, opt =>
                {
                    opt.MapFrom(src => src.Projects.FirstOrDefault<Projects>());
                });*/
              CreateMap<AddCitiesDto,Cities>();
               CreateMap<Cities,AddCitiesDto>();

               CreateMap<CitiestoListDto,Cities>();
               CreateMap<Cities,CitiestoListDto>();

               CreateMap<CountriestoListDto,Countries>();
               CreateMap<Countries,CountriestoListDto>();

                CreateMap<AddCountryDto,Countries>();
               CreateMap<Countries,AddCountryDto>();
        }
    }
}