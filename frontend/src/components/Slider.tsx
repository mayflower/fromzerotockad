import * as React from 'react';
import { Range } from 'react-range';
import {RootState} from "../store/store";
import {useDispatch, useSelector} from "react-redux";
import {setVolume} from "../store/volumeSlice";

const Slider = () => {
    const volume = useSelector((state: RootState) => state.volume.value);
    const dispatch = useDispatch()
        return (
            <Range
                step={0.1}
                min={0}
                max={100}
                values={[volume]}
                onChange={(values) => {
                    dispatch(setVolume(values[0]));
                }}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '6px',
                            width: '100%',
                            backgroundColor: '#ccc'
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '30px',
                            width: '30px',
                            borderRadius: '15px',
                            backgroundColor: '#666'
                        }}
                    />
                )}
            />
        );
}

export default Slider;
