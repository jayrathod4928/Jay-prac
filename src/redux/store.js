import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
        console.error('Failed to load state', error);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (error) {
        console.error('Failed to save state', error);
    }
};

const store = configureStore({
    reducer: {
        users: userReducer,
    },
    preloadedState: loadState(),
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
