import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../apiService.js";
import { toast } from "react-toastify";
import { fetchBooks } from "./bookAPI";

export const fetchData = createAsyncThunk("book/fetchData", async (props) => {
  const response = await fetchBooks(props);
  return response.data;
});

export const getBookDetail = createAsyncThunk(
  "book/getBookDetail",
  async (bookId) => {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  }
);
export const addToReadingList = createAsyncThunk(
  "book/addToReadingList",
  async (book) => {
    const response = await api.post("/favorites", book);
    return response.data;
  }
);

export const removeFromReadingList = createAsyncThunk(
  "book/removeFromReadingList",
  async (bookId) => {
    const response = await api.delete(`/favorites/${bookId}`);
    return response.data;
  }
);

export const fetchReadingList = createAsyncThunk(
  "book/fetchReadingList",
  async () => {
    const response = await api.get("/favorites");
    return response.data;
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    readingList: [],
    bookDetail: null,
    status: null,
  },
  extraReducers: (builder) => {
    // 1. Fetch Data Thunk thunk
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.books = action.payload;
        state.status = null;
      })
      .addCase(fetchData.rejected, (state) => {
        toast.error("failed to fetch books");
      });
    // 2. Fetch detail thunk thunk
    builder
      .addCase(getBookDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.bookDetail = action.payload;
        state.status = null;
      })
      .addCase(getBookDetail.rejected, (state) => {
        toast.error("Failed to fetch book detail");
      });
    // 3. Fetch Reding List thunk thunk
    builder
      .addCase(fetchReadingList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReadingList.fulfilled, (state, action) => {
        state.readingList = action.payload;
        state.status = null;
      })
      .addCase(fetchReadingList.rejected, (state) => {
        toast.error("Failed to fetch reading list");
      });
    // 4. Add to reading list thunk thunk
    builder
      .addCase(addToReadingList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToReadingList.fulfilled, (state, action) => {
        toast.success("The book has been added to the reading list!");
        state.status = null;
      })
      .addCase(addToReadingList.rejected, (state) => {
        toast.error("Failed to add book to reading list");
      });
    // 5. Remove from reading list thunk thunk
    builder
      .addCase(removeFromReadingList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromReadingList.fulfilled, (state, action) => {
        toast.success("The book has been removed");
        state.status = null;
      })
      .addCase(removeFromReadingList.rejected, (state) => {
        toast.error("Failed to remove book from reading list");
      });
  },
});
export default bookSlice.reducer;
