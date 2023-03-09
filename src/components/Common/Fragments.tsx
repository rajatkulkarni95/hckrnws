interface IProps {
  children: React.ReactNode;
}

export const CenteredText = ({ children }: IProps) => {
  return (
    <p className="font-coolSans text-base text-primary font-normal text-center">
      {children}
    </p>
  );
};

export const CraftedBy = () => {
  return (
    <div className="sticky bottom-2 flex justify-between items-center">
      <p className="text-xs text-tertiary">
        Crafted by{" "}
        <a
          href="https://rajatkulkarni.dev/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Rajat
        </a>
      </p>
      <a
        href="https://github.com/rajatkulkarni95/hckrnws"
        target="_blank"
        rel="noreferrer noopener"
        className="text-xs text-tertiary"
      >
        Source Code
      </a>
    </div>
  );
};
