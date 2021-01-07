using System.Collections.Generic;
using System.Threading.Tasks;
using API.Interfaces;
using API.Model;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProjectsRepository : IProjectsRepository
    {
          DataContext _context;
        public ProjectsRepository(DataContext context)
        {
            _context = context;
        }

        

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Projects> GetProjectByCityIdAsync(int cityid)
        {
            return await _context.Projects.Include(p => p.City).SingleOrDefaultAsync(x => x.CityId == cityid);
        }

        public async Task<Projects> GetProjectByIdAsync(int id)
        {
            return await _context.Projects.FindAsync(id);
        }

        public async Task<Projects> GetProjectByProjectnameAsync(string code)
        {
            return await _context.Projects.Include(p => p.City).SingleOrDefaultAsync(x => x.Code == code);
        }

        public async Task<IEnumerable<Projects>> GetProjectsAsync()
        {
            return await _context.Projects.Include(p => p.City).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await  _context.SaveChangesAsync() > 0;
        }

        public void Update(Projects project)
        {
            _context.Entry(project).State = EntityState.Modified;
        }

         public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }

        public async Task<IEnumerable<Cities>> GetAllCityNamesAsync()
        {
             return await _context.Cities.Include(p => p.Projects).ToListAsync();
        }

        public async Task<Cities> GetCityByIdAsync(int id)
        {
            return await _context.Cities.FindAsync(id);
        }

        public async Task<Cities> GetCityByCodeAsync(string citycode)
        {
           return await _context.Cities.Include(p => p.Projects).SingleOrDefaultAsync(x => x.Code == citycode);
        }

        public async Task<IEnumerable<Countries>> GetAllCountryNamesAsync()
        {
           return await  _context.Countries.Include(p => p.Cities).ToListAsync();
        }

        public async Task<Countries> GetCountryByIdAsync(int id)
        {
            return await _context.Countries.FindAsync(id);
        }

        public async Task<Countries> GetCountryByCodeAsync(string citycode)
        {
            return await _context.Countries.Include(p => p.Cities).SingleOrDefaultAsync(x => x.Code == citycode);
        }

        public void UpdateProject(Projects project)
        {
            
        }

        public  void UpdateCountry(Countries country)
        {
             _context.Countries.Update(country);
        }

        public void UpdateCity(Cities city)
        {
            
        }
    }
}