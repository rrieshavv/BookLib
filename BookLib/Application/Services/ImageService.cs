using BookLib.Infrastructure.Configurations;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace BookLib.Application.Services
{
    public class ImageService: IImageService
    {
        private readonly Cloudinary _cloudinary;

        public ImageService(IOptions<CloudinarySettings> config)
        {
            var acc = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        public async Task<DeletionResult> DeleteImageAsync(string publicId)
        {

            if (string.IsNullOrEmpty(publicId))
            {
                return null;
            }

            return await _cloudinary.DestroyAsync(new DeletionParams(publicId));
        }

        public string ExtractPublicIdFromUrl(string imageUrl)
        {
            if (string.IsNullOrEmpty(imageUrl))
                return null;

            try
            {
                var uri = new Uri(imageUrl);
                var pathSegments = uri.AbsolutePath.Split('/');

                int uploadIndex = Array.IndexOf(pathSegments, "upload");
                if (uploadIndex >= 0 && uploadIndex < pathSegments.Length - 2)
                {
                    return string.Join("/", pathSegments.Skip(uploadIndex + 2).ToArray());
                }

                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<ImageUploadResult> UploadImageAsync(
            IFormFile file, 
            string folder, 
            string publicId,
            int width = 500, 
            int height = 500,
            string cropMode = "fill",
            string gravity = "auto")
        {
            if (file == null || file.Length <= 0)
            {
                return null;
            }

            var fullPublicId = $"{folder}/{publicId}";

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
                PublicId = fullPublicId,
                Transformation = new Transformation()
                    .Width(width)
                    .Height(height)
                    .Crop(cropMode)
                    .Gravity(gravity)
                    .Quality(80)
            };

            return await _cloudinary.UploadAsync(uploadParams);
        }




    }
    
}
