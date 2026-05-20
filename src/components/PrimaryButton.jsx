export default function PrimaryButton({ children, loading = false, disabled = false, ...props }) {
  return (
    <button className="btn-primary" disabled={disabled || loading} {...props}>
      {loading ? 'Patiente...' : children}
    </button>
  )
}
