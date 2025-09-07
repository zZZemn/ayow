using System.ComponentModel.DataAnnotations;

namespace ayow.Server.Models
{
    public class Word
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public int Day { get; set; }

        [Required]
        public string AyowWord { get; set; } = string.Empty;

        [Required]
        public string Definition { get; set; } = string.Empty;

        [Required]
        public string PartOfSpeech { get; set; } = string.Empty;
    }
}