import type { ReactNode } from "react";
interface ClientProps {
  children: ReactNode; 
}
export default async function Layout({ children }: ClientProps) {

	return (
		<div className="flex ite">
			<div className="flex-1" >{children}</div>
		</div>
	);
}