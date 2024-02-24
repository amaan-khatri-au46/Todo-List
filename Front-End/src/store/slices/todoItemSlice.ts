import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface TodoItem {
        item: string,
        _id: string
}

interface TodoState {
  data: TodoItem[];
  editItem: any,
  loading: boolean;
}

const initialState: TodoState = {
  data: [],
  editItem: [],
  loading: false
};

export const fetchTodo = createAsyncThunk(
  'todo/fetchTodo',
  async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/item');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addTodoItem = createAsyncThunk(
        'todo/addTodoItem',
        async ({ item }: any, { dispatch }) => {
          console.log('Payload:', item); // Log the payload
          try {
            await axios.post('http://localhost:8000/api/item', { item });
            dispatch(fetchTodo());
          } catch (error) {
            throw error;
          }
        }
      );
      

export const editTodoItem = createAsyncThunk(
        'todo/editTodoItem',
        async ({ id, item }: any, { dispatch }) => {
          console.log('Payload:', { id, item }); // Log the payload
          try {
            await axios.put(`http://localhost:8000/api/item/${id}`, item);
            dispatch(fetchTodo());
          } catch (error) {
            throw error;
          }
        }
      );

export const deleteTodoItem = createAsyncThunk(
        "todo/deleteTodoItem",
        async (id: string, { dispatch }) => {
          try {
            await axios.delete(`http://localhost:8000/api/item/${id}`);
            dispatch(fetchTodo());
          } catch (error) {
            throw error;
          }
        }
      );


const todoSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
   
      setEditItem: (state, action) => {
        state.editItem = action.payload;
      }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        // Handle any error state if needed
      });
  }
});

export const { setLoading, setEditItem } = todoSlice.actions;
export default todoSlice.reducer;
