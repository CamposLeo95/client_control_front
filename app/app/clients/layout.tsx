import type { ReactNode } from "react";
interface ClientProps {

  children: ReactNode; 
  card: ReactNode
}
export default async function Layout({
	children,
	card,

}: ClientProps) {

	return (
		<div className="flex ite">
			<div className="flex-1" >{children}</div>
			<div>{card}</div> 
		</div>
	);
}