namespace BookLib.Models
{
    public class CommonResponse
    {
        public ResponseCode Code { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }

    }


    public enum ResponseCode
    {
        Success = 0,
        Error = 1,
        Exception = 2
    }
}
