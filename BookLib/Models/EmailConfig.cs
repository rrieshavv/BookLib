namespace BookLib.Models
{
    public class EmailConfig
    {
        public string From { get; set; } = null;
        public string SmtpServer { get; set; } = null;
        public int Port { get; set; }
        public string Username { get; set; } = null;
        public string Password { get; set; } = null;
        public string DisplayName { get; set; } = null;
    }

    public class EmailSettings
    {
        public string From { get; set; } = null;

        public string SmtpServer { get; set; } = null;

        public int Port { get; set; }

        public string Username { get; set; } = null;

        public string Password { get; set; } = null;

        public string DisplayName { get; set; } = null;

        public EmailSettings(string from = null, string displayName = null, string smpt = null, int port = 0, string username = null, string password = null)
        {
            From = from;
            SmtpServer = smpt;
            Port = port;
            DisplayName = displayName;
            Username = username;
            Password = password;
        }
    }
}
