export default function Button({ children, variant = 'primary', href, ...props }) {
  const base =
    'inline-flex items-center gap-2 text-sm tracking-widest uppercase transition-colors duration-200 cursor-pointer disabled:opacity-50'

  const variants = {
    primary: 'bg-ink text-paper px-6 py-3 hover:bg-accent',
    outline: 'border border-ink text-ink px-6 py-3 hover:border-accent hover:text-accent',
    text: 'border-b border-ink pb-0.5 hover:border-accent hover:text-accent',
  }

  const classes = `${base} ${variants[variant]}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
