using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ayow.Server.Data;
using ayow.Server.Models;
using ayow.Server.Services;
using ayow.Server.Services;

namespace ayow.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DailyWordController : ControllerBase
    {
        private readonly ILogger<DailyWordController> _logger;
        private readonly AppDbContext _dbContext;

        private readonly IDailyWordService _dailyWordService;

        public DailyWordController(ILogger<DailyWordController> logger, AppDbContext dbContext, IDailyWordService dailyWordService)
        {
            _logger = logger;
            _dbContext = dbContext;
            _dailyWordService = dailyWordService;
        }


        [HttpGet("test")]
        [Authorize]
        public string Test()
        {
            return "Protected: only logged-in users see this!";
        }

        [HttpGet("admin")]
        [Authorize(Roles = "ADMIN")]
        public string AdminOnly()
        {
            return "Only Admin can see this!";
        }

        [Authorize(Roles = "USER")]
        [HttpGet("today")]
        public async Task<IActionResult> GetTodayWord()
        {
            await _dailyWordService.SendWordToAllUsersAsync();

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (!Guid.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized("Invalid user ID in token.");
            }

            var word = await _dailyWordService.GetTodayWordAsync(userId);

            return Ok(word);
        }
    }
}
