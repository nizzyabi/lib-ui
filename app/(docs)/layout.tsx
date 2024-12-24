interface DocsLayoutProps {
  children: React.ReactNode;
}

export default async function DocsLayout({
  children,
}: DocsLayoutProps) {
  return (
    <>
      <main className="flex-1 border-t">{children}</main>
    </>
  );
}
