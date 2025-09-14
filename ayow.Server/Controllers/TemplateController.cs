using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ayow.Server.Data;

namespace ayow.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TemplateController : ControllerBase
    {
        private readonly ILogger<TemplateController> _logger;
        private readonly AppDbContext _dbContext;

        public TemplateController(ILogger<TemplateController> logger, AppDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        /// <summary>
        /// test auth
        /// </summary>
        [HttpGet("test")]
        [Authorize]
        public string Test()
        {
            return "Protected: only logged-in users see this!";
        }

        /// <summary>
        /// test auth for admin role
        /// </summary>
        [HttpGet("admin")]
        [Authorize(Roles = "ADMIN")]
        public string AdminOnly()
        {
            return "Only Admin can see this!";
        }
    }
}
