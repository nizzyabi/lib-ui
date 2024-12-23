interface DocsLayoutProps {
  children: React.ReactNode;
}

export default async function DocsLayout({
  children,
}: DocsLayoutProps) {
  return (
    <>
      <main className="flex-1 border px-4">{children}</main>
    </>
  );
}
