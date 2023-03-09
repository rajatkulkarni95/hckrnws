interface IProps {
  content: string;
}

const InnerHTMLText = ({ content }: IProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
      className="text-base font-coolSans [&>p]:mb-1 [&>p]:whitespace-pre-line [&>a]:whitespace-pre-line [&>a]:text-blue-400 [&>pre]:whitespace-pre-line [&>pre]:p-2 [&>pre]:bg-code [&>pre]:rounded [&>pre]:my-2 [&>pre]:overflow-x-auto [&>pre]:border [&>pre]:border-primary [&>pre>code]:font-mono [&>pre>code]:text-sm"
    />
  );
};

export default InnerHTMLText;
