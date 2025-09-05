using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ayow.Server.Data;
using ayow.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace ayow.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext dbContext, IConfiguration config)
        {
            _dbContext = dbContext;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var errors = new List<object>();

            if (await _dbContext.Users.AnyAsync(x => x.Email == user.Email))
            {
                errors.Add(new { Field = "Email", Message = "Email already exists." });
            }

            if (await _dbContext.Users.AnyAsync(x => x.ContactNo == user.ContactNo))
            {
                errors.Add(new { Field = "ContactNo", Message = "Contact number already exists." });
            }

            if (errors.Any())
            {
                return BadRequest(new { Errors = errors });
            }

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                Message = "user registered in successfully.",
                Auth = new { token, user }
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO req)
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Email == req.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(req.Password, user.Password))
                return Unauthorized("Invalid credentials");

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                Message = "user logged in successfully.",
                Auth = new { token, user }
            });
        }

        [HttpGet("verify")]
        [Authorize]
        public IActionResult Verify()
        {
            var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
            var email = User.FindFirst(JwtRegisteredClaimNames.Email)?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            return Ok(new
            {
                Message = "User verified successfully.",
                Auth = new
                {
                    Id = userId,
                    Email = email,
                    Role = role
                }
            });
        }


        private string GenerateJwtToken(User user)
        {
            var jwtConfig = _config.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig["Key"]!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: jwtConfig["Issuer"],
                audience: jwtConfig["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(double.Parse(jwtConfig["ExpiresInMinutes"]!)),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class LoginDTO
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
