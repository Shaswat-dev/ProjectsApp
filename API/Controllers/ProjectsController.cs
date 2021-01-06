using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  


    public class ProjectsController : BaseApiController
    {
        private readonly DataContext _context;
        public ProjectsController(DataContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Projects>>> GetProjects()
        {
            var projects = await _context.Projects.ToListAsync();
            return projects;
        }

         [HttpGet("{id}")]
        public async Task<ActionResult<Projects>> GetProject(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            return project;
        }

        [HttpPost("addprojects")]
        public async Task<ActionResult<Projects>> AddProject(ProjectDto projectDto)
        {
           var city = await _context.Cities.FindAsync(projectDto.CityId);
            
            var project = new Projects
            {
               
               Code =  projectDto.Code,
               Description = projectDto.Description,
               CityId = projectDto.CityId,
               IsActive = Convert.ToBoolean( projectDto.IsActive),
               City = city
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();
            return project;

        }

    }
}