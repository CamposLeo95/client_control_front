interface IInfoCardProps {
  icon: React.ReactNode;
  data: React.ReactNode;
}

export default function InfoCard({ icon, data }: IInfoCardProps) {
  return (
    <div className="flex items-center gap-3 text-zinc-700">
      <div className="text-indigo-600">{icon}</div>
      <span className="text-base">{data}</span>
    </div>
  );
}