using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ayow.Server.Models
{
    public class DailyWord
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public Guid WordId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = TimeZoneInfo.ConvertTimeFromUtc(
            DateTime.UtcNow,
            TimeZoneInfo.FindSystemTimeZoneById("Asia/Manila")
        );


        [ForeignKey(nameof(UserId))]
        public User? User { get; set; }

        [ForeignKey(nameof(WordId))]
        public Word? Word { get; set; }
    }
}