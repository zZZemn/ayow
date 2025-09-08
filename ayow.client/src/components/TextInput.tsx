import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    isFocused?: boolean;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    ({ type = "text", className = "", isFocused = false, ...props }, ref) => {
        const localRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => localRef.current as HTMLInputElement);

        useEffect(() => {
            if (isFocused) {
                localRef.current?.focus();
            }
        }, [isFocused]);

        return (
            <input
                {...props}
                type={type}
                ref={localRef}
                className={`rounded-md border-1 border-gray-800 shadow-sm p-2
                focus:outline-1
                focus:outline-gray-800
                ${className}`}
            />

        );
    }
);

TextInput.displayName = "TextInput";
export default TextInput;
