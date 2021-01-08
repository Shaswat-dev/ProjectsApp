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



    public class ProjectsController : BaseApiController
    {
        private readonly IProjectsRepository _projectRepository;
        private readonly IMapper _mapper;

        public ProjectsController(IProjectsRepository projectRepository, IMapper mapper)
        {
           _mapper = mapper;
            _projectRepository = projectRepository;


        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Projects>>> GetProjects()
        {
            var projects = await _projectRepository.GetProjectsAsync();

            var projectsval =  _mapper.Map<IEnumerable<ProjectDto>>(projects);
            return Ok(projectsval);
        }

       /* [HttpGet("{projectcode}", Name = "GetProject")]
        public async Task<ActionResult<Projects>> GetProject(string projectcode)
        {
            var project = await _projectRepository.GetProjectByProjectnameAsync(projectcode);
            var projectval =  _mapper.Map<ProjectDto>(project);
            return Ok(projectval);
        }
        */
        [HttpGet("{projectid}", Name = "GetProject")]
        public async Task<ActionResult<Projects>> GetProject(int projectid)
        {
            var project = await _projectRepository.GetProjectByIdAsync(projectid);
            var projectval =  _mapper.Map<ProjectDto>(project);
            return Ok(projectval);
        }

        [HttpPost("addprojects")]
        public async Task<ActionResult<Projects>> AddProject(ProjectDto projectDto)
        {
          //projectDto.IsActive = Convert.ToBoolean(projectDto.IsActive);
          var city = await _projectRepository.GetCityByIdAsync(projectDto.CityId);

          //projectDto.IsActive = true;
            var project = _mapper.Map<Projects>(projectDto);
            project.City =  city;
            _projectRepository.Add(project);
           // await _projectRepository.SaveAllAsync();
           // return Ok(project);
            if (await _projectRepository.SaveAllAsync())
             {
                 var messageToReturn = _mapper.Map<ProjectDto>(project);
                 return CreatedAtRoute("GetProject", 
                     new { projectid = project.Id}, project);
             }
             throw new Exception("Creating the project failed on save");
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id,GetProjectsDto getProjectsDto)
        {
          
          var project =  await _projectRepository.GetProjectByIdAsync(id);
           // country = _mapper.Map<Countries>(addCountryDto);
            _mapper.Map(getProjectsDto, project);
           // await _projectRepository.SaveAllAsync();

             if (await _projectRepository.SaveAllAsync())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");

        }


    }
}