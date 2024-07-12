import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  value: [],
  allValue: [],
  toggleState: false,
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    ADD_TASK: (state, action) => {
      const items = {
        id: nanoid(),
        text: action.payload.text,
        toggleState: false,
      };
      state.value.push(items);
      state.allValue.push(items);
    },
    TOGGLE_TASK: (state, action) => {
      const toggle = state.value.find(
        (items) => items.id === action.payload.id
      );
      if (toggle) {
        toggle.toggleState = !toggle.toggleState;
      }
      const allValue = state.allValue.find(
        (task) => task.id === action.payload.id
      );
      if (allValue) {
        allValue.toggleState = !allValue.toggleState;
      }
    },
    FILTER_TASK: (state, action) => {
      state.value = state.allValue.filter(
        (items) => items.toggleState === action.payload.toggleState
      );
    },
    SHOW_TASK: (state) => {
      state.value = state.allValue;
    },
  },
});

export const { ADD_TASK, TOGGLE_TASK, FILTER_TASK, SHOW_TASK } =
  taskSlice.actions;
export default taskSlice.reducer;
