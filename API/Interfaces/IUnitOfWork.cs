using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IProjectsRepository ProjectsRepository {get;}

    //    IProjectsRepository ProjectsRepository {get;}
    //    IProjectsRepository ProjectsRepository {get;}
     //   IProjectsRepository ProjectsRepository {get;}

        Task<bool> Complete();

        bool HasChanges();
        
    }
}