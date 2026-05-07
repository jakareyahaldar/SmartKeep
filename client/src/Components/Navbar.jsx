import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const items = [
    { name: "Home", path: "/" },
    { name: "Passwords", path: "/passwords" },
    { name: "Notes", path: "/notes" },
    { name: "Contacts", path: "/contacts" },
    { name: "Links", path: "/links" },
    { name: "Tasks", path: "/tasks" },
  ];

  const active = "text-cyan-400";
  const normal = "hover:text-cyan-400";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">

          <div className="text-lg font-bold">Vault</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {items.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? active : normal
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 rounded bg-gray-800 outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-800 px-4 pb-4">

          <input
            type="text"
            placeholder="Search..."
            className="w-full mt-3 px-3 py-2 rounded bg-gray-900 outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <div className="flex flex-col mt-3 gap-2">
            {items.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `py-2 ${isActive ? active : normal}`
                }
                onClick={() => setOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

        </div>
      )}
    </nav>
  );
}