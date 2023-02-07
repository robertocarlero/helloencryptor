export function Avatar({
  src,
  alt,
  size = 42,
  onClick,
  onKeyUp,
  color = 'primary',
  ...props
}) {
  const label = typeof alt === 'string' ? alt[0] : '?';

  return (
    <div
      role="button"
      onKeyUp={onKeyUp ?? null}
      tabIndex={0}
      className={`justify-center rounded-circle d-flex  justify-content-center align-items-center color_white bg_${color}`}
      onClick={onClick ?? null}
      style={{ height: `${size}px`, width: `${size}px` }}
      {...props}
    >
      {src ? <img src={src} alt={alt} /> : <span>{label}</span>}
    </div>
  );
}
