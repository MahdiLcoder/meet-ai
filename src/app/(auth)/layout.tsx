interface Props {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return ( 
    <div className="bg-gradient-to-br from-background via-background to-muted min-h-svh flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-8 md:py-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {children}
      </div>
    </div>
  );
};
 
export default Layout;
