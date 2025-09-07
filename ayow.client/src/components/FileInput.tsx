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
                className={`rounded-md border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 ${className}`}
                ref={localRef}
            />
        );
    }
);

FileInput.displayName = "FileInput";
export default FileInput;
