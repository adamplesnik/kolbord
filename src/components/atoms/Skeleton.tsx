const Skeleton = ({ width = '200px' }) => {
  return (
    <div
      data-testid="skeleton"
      style={{ width: width }}
      className="h-5 animate-pulse rounded-full bg-gray-200 dark:bg-zinc-700/80"
    />
  )
}
export default Skeleton
