import { makeObservable } from "@core/Observer";
import { state } from "./selectedHistory";

export const sate = makeObservable({
    value: null,
    type: null,
});

export const open = (type, value = null) => {
    return (e) => {
        e.stopPropagation();
        state.type = type;
        state.value = value;
    };
};

export const close = (e) => {
    state.type = null;
    state.value = null;
};

export default { makeObservable, open, close, state };
