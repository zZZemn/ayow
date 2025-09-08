import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";

type FileInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
    isFocused?: boolean;
};

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
    ({ className = "", isFocused = false, ...props }, ref) => {
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
                type="file"
                className={`rounded-md border-1 border-gray-800 shadow-sm p-2 cursor-pointer
                    focus:outline-1
                    focus:outline-gray-800
                    ${className}`}
                ref={localRef}
            />
        );
    }
);

FileInput.displayName = "FileInput";
export default FileInput;
