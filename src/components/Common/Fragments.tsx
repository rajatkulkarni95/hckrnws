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
