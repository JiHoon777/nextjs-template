export default async function AuthLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      {children}
      {modal}
    </div>
  )
}
