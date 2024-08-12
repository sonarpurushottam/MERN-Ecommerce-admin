import {
    Navbar,
    NavbarBrand,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
  } from "@nextui-org/react";
  import { useState, useEffect } from "react";
  import { NavLink, useNavigate } from "react-router-dom";
  import axios from "axios";
  import { toast } from "react-hot-toast";
  import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
  
  export default function AdminSidebar() {
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
  
    const menuItems = [
      { name: "Home", path: "/admin-dashboard" },
      { name: "Product List", path: "/products-list" },
      { name: "Add New Product", path: "/upload-product" },
      { name: "Categories", path: "/categories" },
      { name: "Brands", path: "/brands" },
      { name: "Shubham", path: "/shubham" },
      { name: "Users List", path: "/users-list" },
    ];
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:5000/api/users/profile",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setUser(data);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      };
  
      fetchUserProfile();
    }, []);
  
    const handleLogout = async () => {
      try {
        await axios.post(
          "http://localhost:5000/api/users/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        localStorage.removeItem("token"); // Remove token from localStorage
        toast.success("Logged out successfully"); // Show success toast
        navigate("/"); // Navigate to login page
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Failed to log out"); // Show error toast
      }
    };
  
    return (
        
          <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
               {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded-lg sm:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >  <Dropdown placement="bottom-end" className="mt-auto">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={user ? user.username : "User"}
          size="md"
          src={
            user?.profilePic ||
            "https://i.pravatar.cc/150?u=a042581f4e29026704d"
          }
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">
            {user ? user.email : "Loading..."}
          </p>
        </DropdownItem>

        <DropdownItem key="logout" color="danger" onClick={handleLogout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
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
        {isSidebarOpen ? (
          <GiCancel className="w-6 h-6" />
        ) : (
          <GiHamburgerMenu className="w-6 h-6" />
        )}
      </button>
        <Navbar shouldHideOnScroll isBordered>
          <NavbarBrand className="flex items-center p-4">
            <p className="text-xl font-bold">ACME</p>
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
                src={
                  user?.profilePic ||
                  "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">
                  {user ? user.email : "Loading..."}
                </p>
              </DropdownItem>
  
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
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
  