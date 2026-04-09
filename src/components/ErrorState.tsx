interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  onLoadMock: () => void;
}

export function ErrorState({ message, onRetry, onLoadMock }: ErrorStateProps) {
  return (
    <div className="error-container">
      <p className="error-message">{message}</p>
      <button className="retry-button" onClick={onRetry}>
        Try again
      </button>
      <button className="mock-button" onClick={onLoadMock}>
        Show demo data
      </button>
    </div>
  );
}
