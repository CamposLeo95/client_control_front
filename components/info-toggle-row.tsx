export default 
function InfoToggleRow({ icon, label, content }: { icon: React.ReactNode; label: string; content: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-zinc-600">
      <div className="flex items-center gap-2">
        <span className="text-indigo-600">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="text-sm text-right">{content}</div>
    </div>
  );
}