using Newtonsoft.Json;

namespace BookLib.Infrastructure.Common
{
    public static class Helper
    {

        private static Random random = new Random();

        public static int GenerateNumberWithDigits(int digits)
        {
            if (digits < 1)
                throw new ArgumentException("Digits must be at least 1");

            int min = (int)Math.Pow(10, digits - 1);
            int max = (int)Math.Pow(10, digits) - 1;

            return random.Next(min, max + 1);
        }

        public static string GenerateAlphanumericString(int length)
        {
            if (length < 1)
                throw new ArgumentException("Length must be at least 1");

            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        /// <summary>
        /// map object
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="item"></param>
        /// <returns></returns>
        public static T MapObject<T>(this object item)
        {
            T sr = default;
            if (item != null)
            {
                var obj = JsonConvert.SerializeObject(item);
                sr = JsonConvert.DeserializeObject<T>(obj);
            }
            return sr;
        }

        /// <summary>
        /// map list of objects
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="item"></param>
        /// <returns></returns>
        public static List<T> MapObjects<T>(this object item)
        {
            List<T> sr = default;
            if (item != null)
            {
                var obj = JsonConvert.SerializeObject(item);
                sr = JsonConvert.DeserializeObject<List<T>>(obj);
            }
            return sr;
        }

        public static string GetRemoteIpAddress(HttpContext httpContext)
        {
            if (httpContext == null)
            {
                return string.Empty;
            }

            // Try to get the IP address from the connection
            var ipAddress = httpContext.Connection.RemoteIpAddress?.ToString();

            // If the application is behind a proxy, check the X-Forwarded-For header
            if (string.IsNullOrEmpty(ipAddress) && httpContext.Request.Headers.ContainsKey("X-Forwarded-For"))
            {
                ipAddress = httpContext.Request.Headers["X-Forwarded-For"].FirstOrDefault();
            }

            return ipAddress ?? string.Empty;
        }
    }
}
