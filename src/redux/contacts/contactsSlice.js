import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';

const handlePending = state => {
  state.contacts.isLoading = true;
  state.contacts.error = null;
};
const handleRejected = (state, { payload }) => {
  state.contacts.isLoading = false;
  state.contacts.error = payload;
};
const handleFulfilled = state => {
  state.contacts.isLoading = false;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    setFilter(state, { payload }) {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        const index = state.contacts.items.findIndex(
          contact => contact.id === payload.id
        );
        state.contacts.items.splice(index, 1);
      })
      .addMatcher(action => action.type.endsWith('/pending'), handlePending)
      .addMatcher(action => action.type.endsWith('/rejected'), handleRejected)
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        handleFulfilled
      );
  },
});

export const { setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
