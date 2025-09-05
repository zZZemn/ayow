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

        // Expose the DOM input element
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
                className={`rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 ${className}`}
                ref={localRef}
            />
        );
    }
);

TextInput.displayName = "TextInput";
export default TextInput;
