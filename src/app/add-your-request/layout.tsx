
// const inter = Inter({ subsets: ["latin"] });

export default function AddRequestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   
  return (<>
          {children}
      </>
  );
}
