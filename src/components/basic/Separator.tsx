const Separator = ({ horizontal = false }: { horizontal?: boolean }) => {
  if (horizontal) {
    return <div className="hidden w-px shrink-0 bg-zinc-100 md:block"></div>
  } else {
    return <div className="h-px w-full bg-zinc-200 last:hidden"></div>
  }
}

export default Separator
