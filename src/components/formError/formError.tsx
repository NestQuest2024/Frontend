type Props = {
    children: React.ReactNode | React.ReactNode[];
    errorMessage: string | undefined;
};

export function FormError({ children, errorMessage }: Props): React.ReactElement {
    return (
        <div className="flex flex-col gap-1.5 w-full max-w-sm">
            {children}
            <span className="text-red-500 text-xs">{errorMessage}</span>
        </div>
    );
}