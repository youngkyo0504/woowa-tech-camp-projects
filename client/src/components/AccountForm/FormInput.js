import { div, input, label } from "@core/CreateDom";
import { validateEvent } from "./customEvent";

const FormInput = ({
    ref,
    format = (value) => value,
    key,
    placeholder,
    labelText,
    maxLength = 150,
}) => {
    const setInputValue = ({ currentTarget }) => {
        ref[key] = format(currentTarget.value);
        currentTarget.value = ref[key];
        currentTarget.dispatchEvent(validateEvent);
    };

    return div({ class: "inputBox" })(
        div({ class: `inputItem ${key}` })(
            label({ class: "text_bold_small label" })(labelText),
            input({
                maxLength,
                class: "text_body_regular",
                placeholder: placeholder,
                value: format(ref[key]) || "",
                event: {
                    input: setInputValue,
                },
            })(),
        ),
    );
};

export default FormInput;
