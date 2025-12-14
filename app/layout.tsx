export const metadata = {
  title: "AI Hypnoterapi – Prototype",
  description: "Arkitektur- og læringsprototype",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  );
}
