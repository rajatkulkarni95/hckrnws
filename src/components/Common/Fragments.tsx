interface IProps {
  children: React.ReactNode;
}

export const CenteredText = ({ children }: IProps) => {
  return (
    <p className="font-sans text-base text-primary font-normal text-center">
      {children}
    </p>
  );
};

export const CraftedBy = () => {
  return (
    <div className="mt-auto flex justify-between items-center flex-none">
      <p className="text-xs text-secondary">
        Crafted by{" "}
        <a
          href="https://rajatkulkarni.dev/"
          target="_blank"
          rel="noreferrer noopener"
          className="hover:text-primary"
        >
          Rajat
        </a>
      </p>
      <a
        href="https://github.com/rajatkulkarni95/hckrnws"
        target="_blank"
        rel="noreferrer noopener"
        className="text-xs text-secondary hover:text-primary"
      >
        Source Code
      </a>
    </div>
  );
};
