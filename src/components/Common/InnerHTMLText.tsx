interface IProps {
  content: string;
  isDescription?: boolean;
}

const InnerHTMLText = ({ content, isDescription = false }: IProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className={`text-base font-sans [&>p]:mb-1 [&>p]:whitespace-pre-line [&>p>a]:whitespace-pre-line [&>p>a]:underline [&>p>a]:text-link [&>pre]:whitespace-pre-line [&>pre]:p-2 [&>pre]:bg-code [&>pre]:rounded [&>pre]:my-2 [&>pre]:overflow-x-auto [&>pre]:border [&>pre]:border-primary [&>pre>code]:font-mono [&>pre>code]:text-xs md:[&>pre>code]:text-sm ${
        isDescription ? "text-secondary mt-3" : "text-primary"
      }`}
    />
  );
};

export default InnerHTMLText;
