using Newtonsoft.Json;

namespace BookLib.Models
{
    public static class Helper
    {
        /// <summary>
        /// map object
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="item"></param>
        /// <returns></returns>
        public static T MapObject<T>(this object item)
        {
            T sr = default(T);
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
            List<T> sr = default(List<T>);
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
