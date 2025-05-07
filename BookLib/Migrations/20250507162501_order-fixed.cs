using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookLib.Migrations
{
    /// <inheritdoc />
    public partial class orderfixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_books_book_id",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_book_id",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "book_id",
                table: "Orders");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "book_id",
                table: "Orders",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Orders_book_id",
                table: "Orders",
                column: "book_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_books_book_id",
                table: "Orders",
                column: "book_id",
                principalTable: "books",
                principalColumn: "book_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
