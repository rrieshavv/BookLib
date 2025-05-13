namespace BookLib.Application.DTOs.Dashboard
{
    public class AdminDashboardDto
    {
        public int TotalCustomers { get; set; }
        public int TotalBooks { get; set; }
        public int TotalOrders { get; set; }
        public int TotalPendingOrders { get; set; }
        public int TotalCompletedOrders { get; set; }
        public int TotalCancelledOrders { get; set; }
        public int TotalStaffs { get; set; }
    }
}
