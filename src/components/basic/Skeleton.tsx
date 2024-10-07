const Skeleton = ({ width = '200px' }) => {
  return (
    <div
      style={{ width: width }}
      className="h-5 animate-pulse rounded-full bg-gray-200 dark:bg-slate-700/80"
    />
  )
}
export default Skeleton
