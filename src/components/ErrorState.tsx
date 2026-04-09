interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="error-container">
      <p className="error-message">{message}</p>
      <button className="retry-button" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
