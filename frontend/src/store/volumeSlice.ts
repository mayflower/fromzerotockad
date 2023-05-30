import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface VolumeState {
    value: number
}

const initialState: VolumeState = {
    value: 50,
}

export const volumeSlice = createSlice({
    name: 'volume',
    initialState,
    reducers: {
        setVolume: (state, action: PayloadAction<number>) => {
            state.value = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setVolume } = volumeSlice.actions

export default volumeSlice.reducer