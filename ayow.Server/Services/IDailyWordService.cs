using ayow.Server.Models;

namespace ayow.Server.Services
{
    public interface IDailyWordService
    {
        Task SendWordToAllUsersAsync();
        Task<DailyWord?> GetTodayWordAsync(Guid userId);
    }
}
