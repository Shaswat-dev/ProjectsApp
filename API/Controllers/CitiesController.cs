using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Interfaces;
using AutoMapper;

namespace API.Controllers
{
    public class CitiesController : BaseApiController
    {
         IMapper _mapper;
         IProjectsRepository _projectRepository;
        public CitiesController(IMapper mapper, IProjectsRepository projectRepository)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;


        }

         [HttpGet]
        public async Task<ActionResult<IEnumerable<CitiestoListDto>>> GetCities()
        {
            var Cities = await _projectRepository.GetAllCityNamesAsync();
          
            var Citiesval =  _mapper.Map<IEnumerable<CitiestoListDto>>(Cities);
                             
            return Ok(Citiesval);
        }

        
        /* [HttpGet("{citycode}", Name = "GetCity")]
        public async Task<ActionResult<Cities>> GetCity(string citycode)
        {
            var City = await _projectRepository.GetCityByCodeAsync(citycode);
          
            var Citiesval =  _mapper.Map<CitiestoListDto>(City);
            return Ok(Citiesval);
        }*/

         [HttpGet("{cityid}", Name = "GetCity")]
        public async Task<ActionResult<Cities>> GetCity(int cityid)
        {
            var City = await _projectRepository.GetCityByIdAsync(cityid);
          
            var Citiesval =  _mapper.Map<CitiestoListDto>(City);
            return Ok(Citiesval);
        }

        [HttpPost("addcities")]

        public async Task<ActionResult<Cities>> AddCity(AddCitiesDto addCitiesDto)
        {
            var country = await _projectRepository.GetCountryByIdAsync(addCitiesDto.CountryId);
            
            var newcity =  _mapper.Map<Cities>(addCitiesDto);
            newcity.Country = country;
             _projectRepository.Add(newcity);

             if (await _projectRepository.SaveAllAsync())
             {
                 var messageToReturn = _mapper.Map<AddCitiesDto>(newcity);
                 return CreatedAtRoute("GetCity", 
                     new { cityid = newcity.Id}, newcity);
             }
             throw new Exception("Creating the City failed on save");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id,AddCitiesDto addCitiesDto)
        {
          
          var city =  await _projectRepository.GetCityByIdAsync(id);
           // country = _mapper.Map<Countries>(addCountryDto);
            _mapper.Map(addCitiesDto, city);
           // await _projectRepository.SaveAllAsync();

             if (await _projectRepository.SaveAllAsync())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");

        }


            
        }
    }
