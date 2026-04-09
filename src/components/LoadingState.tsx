export function LoadingState() {
  return (
    <div className="loading-container">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="skeleton-card" />
      ))}
    </div>
  );
}
