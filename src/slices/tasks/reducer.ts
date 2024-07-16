import { createSlice } from "@reduxjs/toolkit";
import { getTaskList, addNewTask, updateTask, deleteTask, updateCardData, deleteKanban, getTasks, addCardData } from './thunk';
export const initialState = {
    taskList: [],
    tasks: [],
};
const TasksSlice = createSlice({
    name: 'TasksSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTaskList.fulfilled, (state: any, action: any) => {
            state.taskList = action.payload;
            state.isTaskCreated = false;
            state.isTaskSuccess = true;
        });
        builder.addCase(getTaskList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isTaskCreated = false;
            state.isTaskSuccess = true;
        });
        builder.addCase(addNewTask.fulfilled, (state: any, action: any) => {
            state.taskList.push(action.payload);
            state.isTaskCreated = true;
            state.isTaskAdd = true;
            state.isTaskAddFail = false;
        });
        builder.addCase(addNewTask.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isTaskAdd = false;
            state.isTaskAddFail = true;
        });
        builder.addCase(updateTask.fulfilled, (state: any, action: any) => {
            state.taskList = state.taskList.map((task: any) =>
                task.id === action.payload.id
                    ? { ...task, ...action.payload }
                    : task
            );
            state.isTaskUpdate = true;
            state.isTaskUpdateFail = false;
        });
        builder.addCase(updateTask.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isTaskUpdate = false;
            state.isTaskUpdateFail = true;
        });
        builder.addCase(deleteTask.fulfilled, (state: any, action: any) => {
            state.taskList = state.taskList.filter((task: any) => task.id.toString() !== action.payload.task.toString());
            state.isTaskDelete = true;
            state.isTaskDeleteFail = false;
        });
        builder.addCase(deleteTask.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isTaskDelete = false;
            state.isTaskDeleteFail = true;
        });
        // Kanban Board
        builder.addCase(getTasks.fulfilled, (state: any, action: any) => {
            state.tasks = action.payload;
        });
        builder.addCase(getTasks.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload?.error : null;
        });
        builder.addCase(addCardData.fulfilled, (state: any, action: any) => {
            const existingTaskList = state.tasks.find(
                (kanbanList: any) => kanbanList.id === action.payload.kanId
            );
            if (existingTaskList) {
                state.tasks = state.tasks.map((kanbanList: any) => {
                    if (kanbanList.id === action.payload.kanId) {
                        const updatedTaskList = {
                            ...kanbanList,
                            cards: [...kanbanList.cards, action.payload],
                        };
                        return updatedTaskList;
                    }
                    return kanbanList;
                });
            } else {
                state.tasks = [...state.tasks, action.payload];
            }
        });
        builder.addCase(addCardData.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(updateCardData.fulfilled, (state: any, action: any) => {
            state.tasks = state.tasks.map((task: any) => {
                if (task.id === action.payload.kanId) {
                    return {
                        ...task,
                        cards: task.cards.map((card: any) =>
                            card.id.toString() === action.payload.id.toString()
                                ? { card, ...action.payload }
                                : card
                        ),
                    }
                }
                return task
            })
        });
        builder.addCase(updateCardData.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });
        builder.addCase(deleteKanban.fulfilled, (state: any, action: any) => {
            state.tasks = state.tasks.map((kanbanList: any) => {
                const updatedTaskList = {
                    ...kanbanList,
                    cards: kanbanList.cards.filter((task: any) => {
                        return task.id.toString() !== action.payload.toString();
                    }),
                };
                return updatedTaskList;
            })
        });
        builder.addCase(deleteKanban.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
    }
});
export default TasksSlice.reducer;