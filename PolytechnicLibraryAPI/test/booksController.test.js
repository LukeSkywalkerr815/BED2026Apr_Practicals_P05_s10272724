const booksController = require("../controllers/bookController");
const Book = require("../models/bookModel");

// Mock the Book model
jest.mock("../models/bookModel"); 

describe("booksController", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  describe("getBooks", () => {
    it("should fetch all books and return a JSON response with status 200", async () => {
      const mockBooks = [
        { id: 1, title: "The Lord of the Rings" },
        { id: 2, title: "The Hitchhiker's Guide to the Galaxy" },
      ];

      Book.getAllBooks.mockResolvedValue(mockBooks);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(), // Added status()
        json: jest.fn(), 
      };

      await booksController.getBooks(req, res); 

      expect(Book.getAllBooks).toHaveBeenCalledTimes(1); 
      expect(res.status).toHaveBeenCalledWith(200); // Expect status 200
      expect(res.json).toHaveBeenCalledWith(mockBooks); 
    });

    it("should handle errors and return a 500 status with JSON error message", async () => {
      const errorMessage = "Database error";
      Book.getAllBooks.mockRejectedValue(new Error(errorMessage)); 

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(), // Added status()
        json: jest.fn(), // Replaced send() with json()
      };

      await booksController.getBooks(req, res); 

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" }); // Match your actual error format
    });
  });

  describe("updateAvailability", () => {
    it("should update a book and return success status", async () => {
      Book.updateBookAvailability.mockResolvedValue(true);

      const req = {
        params: { bookId: 1 },
        body: { availability: "Y" }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
      };

      await booksController.updateAvailability(req, res); 

      expect(Book.updateBookAvailability).toHaveBeenCalledTimes(1);
    });
  });
});