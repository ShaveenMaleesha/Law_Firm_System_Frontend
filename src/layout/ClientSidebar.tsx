import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PieChartIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";
import { useTokenInfo } from "../hooks/useTokenDetails";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/client"
  },
  {
    icon: <PieChartIcon/>,
    name: "My Appointments",
    path: "/client/appointments",
  },
  {
    icon: <ListIcon/>,
    name: "My Cases",
    path: "/client/cases",
  },
  {
    icon: <TableIcon />,
    name: "Documents",
    path: "/client/documents"
  },
  {
    icon: <UserCircleIcon />,
    name: "Profile",
    path: "/client/profile",
  },
];

const othersItems: NavItem[] = [];

const ClientSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const { user } = useAuth();
  const { username, email } = useTokenInfo();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location.pathname, isActive]);

  const toggleSubmenu = (type: "main" | "others", index: number) => {
    if (
      openSubmenu &&
      openSubmenu.type === type &&
      openSubmenu.index === index
    ) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu({ type, index });
    }
  };

  useEffect(() => {
    const calculateHeights = () => {
      Object.entries(subMenuRefs.current).forEach(([key, ref]) => {
        if (ref) {
          const height = ref.scrollHeight;
          setSubMenuHeight((prev) => ({ ...prev, [key]: height }));
        }
      });
    };

    calculateHeights();
    window.addEventListener("resize", calculateHeights);
    return () => window.removeEventListener("resize", calculateHeights);
  }, []);

  const renderNavItem = (
    item: NavItem,
    index: number,
    type: "main" | "others"
  ) => {
    const key = `${type}-${index}`;
    const isSubmenuOpen =
      openSubmenu?.type === type && openSubmenu.index === index;
    const hasActiveSubItem = item.subItems?.some((subItem) =>
      isActive(subItem.path)
    );

    if (!item.subItems) {
      return (
        <li key={key}>
          <Link
            to={item.path || "#"}
            className={`group flex items-center gap-x-3 rounded-xl px-3 py-2.5 text-sm duration-300 ${
              isActive(item.path || "")
                ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.05] dark:hover:text-white"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className="flex h-5 w-5 items-center justify-center">
              {item.icon}
            </span>
            <span
              className={`transition-opacity duration-300 ${
                isExpanded || isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.name}
            </span>
          </Link>
        </li>
      );
    }

    return (
      <li key={key}>
        <button
          onClick={() => toggleSubmenu(type, index)}
          className={`group flex w-full items-center justify-between gap-x-3 rounded-xl px-3 py-2.5 text-sm duration-300 ${
            hasActiveSubItem
              ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.05] dark:hover:text-white"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center gap-x-3">
            <span className="flex h-5 w-5 items-center justify-center">
              {item.icon}
            </span>
            <span
              className={`transition-opacity duration-300 ${
                isExpanded || isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.name}
            </span>
          </div>
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform duration-300 ${
              isSubmenuOpen ? "rotate-180" : ""
            } ${isExpanded || isHovered ? "opacity-100" : "opacity-0"}`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isSubmenuOpen ? `max-h-[${subMenuHeight[key]}px]` : "max-h-0"
          }`}
          style={{
            maxHeight: isSubmenuOpen ? `${subMenuHeight[key]}px` : "0px",
          }}
        >
          <div
            ref={(el) => {
              if (el) subMenuRefs.current[key] = el;
            }}
            className="ml-8 mt-2 space-y-1"
          >
            {item.subItems?.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                to={subItem.path}
                className={`flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
                  isActive(subItem.path)
                    ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
                }`}
              >
                <span
                  className={`transition-opacity duration-300 ${
                    isExpanded || isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {subItem.name}
                </span>
                {subItem.pro && (
                  <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                    PRO
                  </span>
                )}
                {subItem.new && (
                  <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                    NEW
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-white transition-all duration-300 ease-in-out dark:bg-gray-900 ${
          isExpanded || isHovered ? "w-[290px]" : "w-[90px]"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } border-r border-gray-200 dark:border-gray-800`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200 px-6 dark:border-gray-800">
            <Link to="/client" className="flex items-center gap-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-white dark:bg-white dark:text-gray-800">
                <span className="text-sm font-bold">LC</span>
              </div>
              <span
                className={`text-lg font-semibold text-gray-800 transition-opacity duration-300 dark:text-white ${
                  isExpanded || isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                ASM Legal Association
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-8">
              {/* Main Menu */}
              <div>
                <h3
                  className={`mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400 transition-opacity duration-300 dark:text-gray-500 ${
                    isExpanded || isHovered ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Client Menu
                </h3>
                <ul className="space-y-1">
                  {navItems.map((item, index) =>
                    renderNavItem(item, index, "main")
                  )}
                </ul>
              </div>

              {/* Others */}
              {othersItems.length > 0 && (
                <div>
                  <h3
                    className={`mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400 transition-opacity duration-300 dark:text-gray-500 ${
                      isExpanded || isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    Others
                  </h3>
                  <ul className="space-y-1">
                    {othersItems.map((item, index) =>
                      renderNavItem(item, index, "others")
                    )}
                  </ul>
                </div>
              )}
            </div>
          </nav>

          {/* Widget */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-800">
            <SidebarWidget />
          </div>

          {/* User Profile */}
          <div className="border-t border-gray-200 p-4 dark:border-gray-800">
            <div className="flex items-center gap-x-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700">
                <img
                  src={user?.profilePicture || "/images/user/user-03.png"}
                  alt="User"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div
                className={`transition-opacity duration-300 ${
                  isExpanded || isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  {username || user?.name || "Client User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {email || user?.email || "client@example.com"}
                </p>
              </div>
              <button
                className={`ml-auto transition-opacity duration-300 ${
                  isExpanded || isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <HorizontaLDots className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ClientSidebar;
