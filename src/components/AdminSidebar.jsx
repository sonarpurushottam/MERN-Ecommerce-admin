import {
  Navbar,
  NavbarBrand,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserProfile } from "../hooks/useUserProfile";
import { useLogout } from "../hooks/useLogout";

export default function AdminSidebar() {
  const { data: user, isLoading } = useUserProfile();
  const { mutate: handleLogout, isLoading: isLoggingOut } = useLogout();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/admin-dashboard" },
    { name: "Product List", path: "/products-list" },
    { name: "Add New Product", path: "/upload-product" },
    { name: "Categories", path: "/categories" },
    { name: "Brands", path: "/brands" },
    { name: "Users List", path: "/users-list" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Orders Dashboard", path: "/admin/orders-summary" },
  ];

  const onLogout = () => {
    handleLogout();
  };
  const onEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
      <Navbar shouldHideOnScroll isBordered>
        <NavbarBrand className="flex items-center p-4">
          <p className="text-xl font-bold">ADMIN</p>
        </NavbarBrand>
        <Dropdown placement="bottom-end" className="mt-auto">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={user ? user.username : "User"}
              size="md"
              src={user?.profilePic}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">
                {isLoading ? "Loading..." : user?.email}
              </p>
            </DropdownItem>
            <DropdownItem key="edit-profile" onClick={onEditProfile}>
              <p className="font-semibold">edit profile</p>
            </DropdownItem>

            <DropdownItem
              key="logout"
              color="danger"
              onClick={onLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Log Out"}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Navbar>

      <div className="flex flex-col p-4">
        <div className="flex-1">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-gray-600" : "hover:bg-gray-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
