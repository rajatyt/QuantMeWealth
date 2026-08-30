// Sidebar placeholder — wire up when adding Dashboard/Portfolio pages
export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 glass-panel border-r border-[#172545] min-h-screen p-4">
      <nav className="space-y-2 text-sm text-slate-400">
        <a href="#" className="block px-3 py-2 rounded-lg hover:bg-[#0a101f] hover:text-cyan-400">Dashboard</a>
        <a href="#" className="block px-3 py-2 rounded-lg hover:bg-[#0a101f] hover:text-cyan-400">Portfolio</a>
        <a href="#" className="block px-3 py-2 rounded-lg hover:bg-[#0a101f] hover:text-cyan-400">Strategies</a>
        <a href="#" className="block px-3 py-2 rounded-lg hover:bg-[#0a101f] hover:text-cyan-400">Settings</a>
      </nav>
    </aside>
  );
}
