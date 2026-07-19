const Book = require("../models/bookModel");
const sql = require("mssql");

jest.mock("mssql"); 

describe("Book Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllBooks", () => {
    it("should retrieve all books from the database", async () => {
      const mockBooks = [
        { id: 1, title: "The Lord of the Rings", author: "J.R.R. Tolkien", availability: "Y" },
        { id: 2, title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", availability: "N" },
      ];

      const mockRequest = {
        query: jest.fn().mockResolvedValue({ recordset: mockBooks }),
      };
      
      const mockConnection = {
        request: jest.fn().mockReturnValue(mockRequest),
        close: jest.fn().mockResolvedValue(undefined),
      };

      sql.connect.mockResolvedValue(mockConnection); 

      const books = await Book.getAllBooks();

      expect(sql.connect).toHaveBeenCalled();
      expect(books).toHaveLength(2);
      expect(books[0].title).toBe("The Lord of the Rings");
    });

    it("should handle errors when retrieving books", async () => {
      const errorMessage = "Database Error";
      sql.connect.mockRejectedValue(new Error(errorMessage));
      await expect(Book.getAllBooks()).rejects.toThrow(errorMessage);
    });
  });

  describe("updateBookAvailability", () => {
    it("should update the availability of a book and return true", async () => {
      const mockRequest = {
        input: jest.fn().mockReturnThis(), 
        query: jest.fn().mockResolvedValue({ rowsAffected: [1] }), // Simulate 1 row updated successfully
      };
      const mockConnection = {
        request: jest.fn().mockReturnValue(mockRequest),
        close: jest.fn().mockResolvedValue(undefined),
      };

      sql.connect.mockResolvedValue(mockConnection);

      const isUpdated = await Book.updateBookAvailability(1, "Y");

      expect(sql.connect).toHaveBeenCalled();
      expect(isUpdated).toBe(true); // Your model returns true!
    });

    it("should return false if book with the given id does not exist", async () => {
      const mockRequest = {
        input: jest.fn().mockReturnThis(),
        query: jest.fn().mockResolvedValue({ rowsAffected: [0] }), // Simulate 0 rows updated
      };
      const mockConnection = {
        request: jest.fn().mockReturnValue(mockRequest),
        close: jest.fn().mockResolvedValue(undefined),
      };

      sql.connect.mockResolvedValue(mockConnection);

      const isUpdated = await Book.updateBookAvailability(999, "Y");

      expect(isUpdated).toBe(false); // Your model returns false!
    });
  });
});