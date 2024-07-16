import { createSlice } from "@reduxjs/toolkit";
import { getFolders, addNewFolder, updateFolder, deleteFolder, getFiles, addNewFile, updateFile, deleteFile } from './thunk';
export const initialState :any= {
  folders: [],
  files: [],
  error: {},
};

const FileManagerSlice = createSlice({
  name: 'FileManagerSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFolders.fulfilled, (state:any, action:any) => {
      state.folders = action.payload;
    });
    builder.addCase(getFolders.rejected, (state:any, action:any) => {
      state.error = action.payload;
    });

    builder.addCase(addNewFolder.fulfilled, (state:any, action:any) => {
      state.folders.push(action.payload);
    });
    builder.addCase(addNewFolder.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateFolder.fulfilled, (state:any, action:any) => {
      state.folders = state.folders.map((folder:any) =>
        folder.id.toString() === action.payload.id.toString()
          ? { ...folder, ...action.payload }
          : folder
      );
    });

    builder.addCase(updateFolder.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteFolder.fulfilled, (state:any, action:any) => {
      state.folders = state.folders.filter(
        (folder:any) => (folder.id + "") !== (action.payload + "")
      );
    });
    builder.addCase(deleteFolder.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(getFiles.fulfilled, (state:any, action:any) => {
      state.files = action.payload;
    });
    builder.addCase(getFiles.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(addNewFile.fulfilled, (state:any, action:any) => {
      state.files.push(action.payload);
    });

    builder.addCase(addNewFile.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(updateFile.fulfilled, (state:any, action:any) => {
      state.files = state.files.map((file:any) =>
        file.id.toString() === action.payload.id.toString()
          ? { ...file, ...action.payload }
          : file
      );
    });

    builder.addCase(updateFile.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });

    builder.addCase(deleteFile.fulfilled, (state:any, action:any) => {
      state.files = state.files.filter(
        (file:any) => (file.id + "") !== (action.payload + "")
      );
    });
    builder.addCase(deleteFile.rejected, (state:any, action:any) => {
      state.error = action.payload.error || null;
    });
  }
});

export default FileManagerSlice.reducer;