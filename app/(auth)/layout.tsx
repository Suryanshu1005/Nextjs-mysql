export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode,
  }) {
    return(
        <div className="h-[100%]">
            {children}
        </div>
    )
}