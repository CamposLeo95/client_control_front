import FormRecovery from "./components/form-recovery";

interface RecoveryPageProps {
  params: Promise<{ token: string }>;
}
export default async function RecoveryPage({ params }: RecoveryPageProps) {
  const { token } = await params;
  if (!token) {
    return <div>Erro ao tentar recuperar senha</div>;
  }

  return (
    <div>
      <FormRecovery token={token}  />
    </div>
  );
}