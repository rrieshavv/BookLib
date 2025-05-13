using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace BookLib.Application.DTOs.Book
{
    public class BookDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string ISBN { get; set; }

        public DateTime PublicationDate { get; set; }
        public decimal CurrentDicountedPrice { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public string Language { get; set; }

        public string Format { get; set; }

        public int StockQty { get; set; }

        public bool IsOnSale { get; set; }

        public DateTime CreatedDate { get; set; }

        public string CreatedBy { get; set; }

        public DateTime UpdatedDate { get; set; }

        public string UpdatedBy { get; set; }

        public List<AuthorDto> Authors { get; set; }

        public List<GenreDto> Genres { get; set; }

        public List<PublisherDto> Publishers { get; set; }

        public string ImageUrl { get; set; }

    }

}
