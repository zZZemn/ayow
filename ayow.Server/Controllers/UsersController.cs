using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ayow.Server.Data;
using ayow.Server.Models;

namespace ayow.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly AppDbContext _dbContext;

        public UsersController(ILogger<UsersController> logger, AppDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        /// <summary>
        /// get list of users
        /// </summary>
        [HttpGet]
        public ActionResult<IEnumerable<User>> Get()
        {
            var users = _dbContext.Users.ToList();
            return Ok(users);
        }

        /// <summary>
        /// get user details using user id
        /// </summary>
        [HttpGet("{id}")]
        public ActionResult<User> GetUser(Guid id)
        {
            var user = _dbContext.Users.FirstOrDefault(x => x.Id == id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }
    }
}
