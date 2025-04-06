export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Question not found</h1>
      <p className="text-muted-foreground text-sm">
        The question you are looking for does not exist.
      </p>
    </div>
  )
}
