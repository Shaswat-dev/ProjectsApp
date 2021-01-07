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
    public class CountriesController : BaseApiController
    {
        
        IMapper _mapper;
         IProjectsRepository _projectRepository;
        public CountriesController(IMapper mapper, IProjectsRepository projectRepository)
        {
            _projectRepository = projectRepository;
            _mapper = mapper;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CountriestoListDto>>> GetCountries()
        {
            var Countries = await _projectRepository.GetAllCountryNamesAsync();
          
            var Countriesval =  _mapper.Map<IEnumerable<CountriestoListDto>>(Countries);
                             
            return Ok(Countriesval);
        }

        
         [HttpGet("{countryid}", Name = "GetCountry")]
        public async Task<ActionResult<CountriestoListDto>> GetCountry(int countryid)
        {
            var Country = await _projectRepository.GetCountryByIdAsync(countryid);
          
            var Countriesval =  _mapper.Map<CountriestoListDto>(Country);
            return Ok(Countriesval);
        }

        [HttpPost("addcountries")]
        public async Task<ActionResult<Countries>> AddCountry(AddCountryDto addCountryDto)
        {
            var newcountry =  _mapper.Map<Countries>(addCountryDto);
            
             _projectRepository.Add(newcountry);

             if (await _projectRepository.SaveAllAsync())
             {
                 var messageToReturn = _mapper.Map<AddCountryDto>(newcountry);
                 return CreatedAtRoute("GetCountry", 
                     new { countryid = newcountry.Id}, newcountry);
             }
             throw new Exception("Creating the City failed on save");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id,AddCountryDto addCountryDto)
        {
          
          var country =  await _projectRepository.GetCountryByIdAsync(id);
           // country = _mapper.Map<Countries>(addCountryDto);
            _mapper.Map(addCountryDto, country);
           // await _projectRepository.SaveAllAsync();

             if (await _projectRepository.SaveAllAsync())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");

        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

    }
}