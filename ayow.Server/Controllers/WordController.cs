using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ayow.Server.Data;
using ayow.Server.Models;

namespace ayow.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WordController : ControllerBase
    {
        private readonly ILogger<WordController> _logger;
        private readonly AppDbContext _dbContext;

        public WordController(ILogger<WordController> logger, AppDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        [HttpPost("importWords")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> ImportWords([FromBody] List<WordDTO> words)
        {
            if (words.Any())
            {
                var lastDay = await _dbContext.Words.MaxAsync(w => (int?)w.Day) ?? 0;

                var dbWords = words.Select((word, index) => new Word
                {
                    Day = lastDay + index + 1,
                    AyowWord = word.Word,
                    Definition = word.Definition,
                    PartOfSpeech = word.PartOfSpeech
                }).ToList();

                await _dbContext.Words.AddRangeAsync(dbWords);
                await _dbContext.SaveChangesAsync();
            }

            return Ok(new { Message = "words imported successfully" });
        }

        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> GetWords()
        {
            var words = await _dbContext.Words.ToListAsync();
            return Ok(words);
        }

    }

    public class WordDTO
    {
        public string Word { get; set; } = string.Empty;
        public string Definition { get; set; } = string.Empty;
        public string PartOfSpeech { get; set; } = string.Empty;
    }
}
