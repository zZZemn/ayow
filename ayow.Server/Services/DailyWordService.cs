using System.Runtime.Intrinsics.X86;
using ayow.Server.Data;
using ayow.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace ayow.Server.Services
{
    public class DailyWordService : IDailyWordService
    {
        private readonly AppDbContext _dbContext;

        public DailyWordService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task SendWordToAllUsersAsync()
        {
            var today = DateTime.Now;


            var users = await _dbContext.Users.Where(u => u.Role == "USER").ToListAsync();
            var wordList = await _dbContext.Words.ToListAsync();
            var dailyWords = await _dbContext.DailyWords.Include(dw => dw.Word).ToListAsync();

            var hasDwToday = dailyWords.Where(dw => dw.CreatedAt.Date == today.Date).ToList();

            var usersWithoutDWToday = users.Where(u => !hasDwToday.Any(dw => dw.UserId == u.Id)).ToList();

            if (!usersWithoutDWToday.Any())
                return;

            var usersLastReceiveDwDayDict = new Dictionary<Guid, int?>();

            foreach (var user in usersWithoutDWToday)
            {
                var lastSentDay = dailyWords
                    .Where(dw => dw.UserId == user.Id)
                    .OrderByDescending(dw => dw.CreatedAt)
                    .FirstOrDefault()?.Word?.Day;

                usersLastReceiveDwDayDict[user.Id] = lastSentDay;
            }

            foreach (var user in usersLastReceiveDwDayDict)
            {
                var newWordDayNo = user.Value == null
                ? 1
                : user.Value + 1;

                var newWordToSend = wordList.Where(dw => dw.Day == newWordDayNo).FirstOrDefault();

                if (newWordToSend == null)
                    continue;


                var word = new DailyWord
                {
                    UserId = user.Key,
                    WordId = newWordToSend.Id,
                    CreatedAt = today,
                    Word = newWordToSend
                };

                _dbContext.Add(word);
            }

            await _dbContext.SaveChangesAsync();
        }

        public async Task<DailyWord?> GetTodayWordAsync(Guid userId)
        {
            var today = DateTime.Today;

            var word = await _dbContext.DailyWords
                .Include(dw => dw.Word)
                .Include(dw => dw.User)
                .FirstOrDefaultAsync(dw => dw.CreatedAt.Date == today.Date && dw.UserId == userId);

            if (word != null)
                return word;

            var lastWordSent = await _dbContext.DailyWords
                .Where(dw => dw.UserId == userId)
                .OrderByDescending(dw => dw.CreatedAt)
                .Include(dw => dw.Word)
                .FirstOrDefaultAsync();

            var newWordDayNo = lastWordSent == null
                ? 1
                : lastWordSent.Word!.Day + 1;

            var newWordToSend = await _dbContext.Words
                .FirstOrDefaultAsync(w => w.Day == newWordDayNo);

            if (newWordToSend == null)
                return null;

            word = new DailyWord
            {
                UserId = userId,
                WordId = newWordToSend.Id,
                CreatedAt = today,
                Word = newWordToSend,
                User = await _dbContext.Users.FindAsync(userId)
            };

            _dbContext.Add(word);
            await _dbContext.SaveChangesAsync();

            return word;
        }
    }
}
