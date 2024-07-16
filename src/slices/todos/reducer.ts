import { createSlice } from "@reduxjs/toolkit";
import { getTodos, addNewTodo, updateTodo, deleteTodo, getProjects, addNewProject } from './thunk';
export const initialState :any= {
  todos: [],
  projects: [],
  error: {},
};

const TodosSlice = createSlice({
  name: 'TodosSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state:any, action:any) => {
      state.todos = action.payload;
    });
    builder.addCase(getTodos.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(addNewTodo.fulfilled, (state:any, action:any) => {
      state.todos.unshift(action.payload);
    });
    builder.addCase(addNewTodo.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(updateTodo.fulfilled, (state:any, action:any) => {
      state.todos = state.todos.map((todo:any) =>
        todo.id.toString() === action.payload.id.toString()
          ? { ...todo, ...action.payload }
          : todo
      );
    });
    builder.addCase(updateTodo.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(deleteTodo.fulfilled, (state:any, action:any) => {
      state.todos = state.todos.filter(
        (todo:any) => (todo.id + "") !== (action.payload + "")
      );
    });
    builder.addCase(deleteTodo.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(getProjects.fulfilled, (state:any, action:any) => {
      state.projects = action.payload;
    });
    builder.addCase(getProjects.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
    builder.addCase(addNewProject.fulfilled, (state:any, action:any) => {
      state.projects.push(action.payload);
    });
    builder.addCase(addNewProject.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
  }
});

export default TodosSlice.reducer;