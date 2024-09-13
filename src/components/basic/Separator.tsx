const Separator = ({ horizontal = false }: { horizontal?: boolean }) => {
  if (horizontal) {
    return <div className="hidden w-px bg-slate-100 md:block"></div>
  } else {
    return <div className="h-px w-full bg-slate-200 last:hidden"></div>
  }
}

export default Separator
