
interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export default function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between text-zinc-600">
      <div className="flex items-center gap-2">
        <span className="text-indigo-600">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className="text-sm text-right">{value}</span>
    </div>
  );
}