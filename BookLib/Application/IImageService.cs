using CloudinaryDotNet.Actions;

namespace BookLib.Application
{
    public interface IImageService
    {
        Task<ImageUploadResult> UploadImageAsync(
           IFormFile file,
           string folder,
           string publicId,
           int width = 500,
           int height = 500,
           string cropMode = "fill",
           string gravity = "auto");


        Task<DeletionResult> DeleteImageAsync(string publicId);
        string ExtractPublicIdFromUrl(string imageUrl);



    }
}
