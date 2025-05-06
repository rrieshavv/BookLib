namespace BookLib.Functions
{
    public static class EmailTemplates
    {
        public static string ResetPasswordTokenEmail(string token, string username)
        {
            return $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    padding: 20px;
                }}
                .container {{
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }}
                .token {{
                    font-weight: bold;
                    color: #2c3e50;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <h2>Hello {username},</h2>
                <p>You requested to reset your password.</p>
                <p>Use the following token to reset your password:</p>
                <p class='token'>{token}</p>
                <p>If you did not request a password reset, please ignore this email.</p>
                <br/>
                <p>Thanks,<br/>Your Support Team</p>
            </div>
        </body>
        </html>";
        }

    }
}
