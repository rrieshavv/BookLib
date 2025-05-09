using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookLib.Migrations
{
    /// <inheritdoc />
    public partial class one_to_one_relationship_between_order_and_invoice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    invoice_id = table.Column<Guid>(type: "uuid", nullable: false),
                    invoice_no = table.Column<string>(type: "text", nullable: false),
                    status = table.Column<string>(type: "text", nullable: false),
                    issued_ts = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    cleard_ts = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.invoice_id);
                    table.ForeignKey(
                        name: "FK_Invoices_Orders_invoice_id",
                        column: x => x.invoice_id,
                        principalTable: "Orders",
                        principalColumn: "order_id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Invoices");
        }
    }
}
