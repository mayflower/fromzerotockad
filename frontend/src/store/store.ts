import { configureStore } from '@reduxjs/toolkit'
import volumeReducer from "./volumeSlice"

export const store = configureStore({
    reducer: {
        volume: volumeReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch