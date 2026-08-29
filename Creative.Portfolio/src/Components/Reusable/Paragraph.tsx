type ParagraphProps = {
    children: React.ReactNode;
    className?: string;
};

export function Paragraph({ children, className }: ParagraphProps) {
    return (
        <p className={`text-2xs uppercase font-medium ${className ?? ""}`}>
            {children}
        </p>
    );
}