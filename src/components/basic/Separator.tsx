const Separator = ({ horizontal = false }: { horizontal?: boolean }) => {
  if (horizontal) {
    return <div className="hidden w-px shrink-0 bg-black/5 md:block"></div>
  } else {
    return <div className="h-px w-full bg-black/5 last:hidden"></div>
  }
}

export default Separator
