import NavBarApp from "./_components/nav-bar";
import SideBar from "./_components/side-bar";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden md:flex md:flex-col w-48 ">
        <SideBar />
      </aside>
      <div className="flex flex-col flex-1 min-h-screen ">
        <header className="sticky top-0 shadow h-16 flex items-center w-full">
          <NavBarApp />
        </header>
        <main className="flex-1 p-4 ">{children}</main>
      </div>
    </div>
  );
}