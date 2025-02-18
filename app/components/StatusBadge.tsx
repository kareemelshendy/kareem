export default function StatusBadge({ status }: { status: 'online' | 'offline' }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`text-sm ${
          status === 'online' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {status === 'online' ? 'Online' : 'Offline'}
      </span>
      {status === 'online' ? (
        <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </div>
  );
} 