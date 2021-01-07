using System.Threading.Tasks;
using API.Model;
using System.Collections.Generic;

namespace API.Interfaces
{
    public interface IProjectsRepository
    {
        

        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        
        void UpdateProject(Projects project);

        

        Task<IEnumerable<Projects>> GetProjectsAsync();

        Task<Projects> GetProjectByIdAsync(int id);

        Task<Projects> GetProjectByProjectnameAsync(string code);

        Task<Projects> GetProjectByCityIdAsync(int cityid);

         Task<bool> SaveAllAsync();

         bool HasChanges();

         Task<IEnumerable<Cities>> GetAllCityNamesAsync();

         Task<Cities> GetCityByIdAsync(int id);

         Task<Cities> GetCityByCodeAsync(string citycode);

         Task<IEnumerable<Countries>> GetAllCountryNamesAsync();

         Task<Countries> GetCountryByIdAsync(int id);

         Task<Countries> GetCountryByCodeAsync(string citycode);

         void UpdateCountry(Countries country);
         
         void UpdateCity(Cities city);
        
         
    }
}