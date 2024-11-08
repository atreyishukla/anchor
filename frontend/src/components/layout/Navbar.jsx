import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { Bell, User, Users, LogOutIcon, Microscope, Album} from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../themeToggle";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'lighttheme');

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  // Set icon color based on theme
  const iconColor = theme === 'lighttheme' ? "#2859ff" : "#FFFFFF";

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    enabled: !!authUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => axiosInstance.get("/connections/requests"),
    enabled: !!authUser,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
  const unreadConnectionRequestsCount = connectionRequests?.data?.length;

  return (
    <nav className="bg-base-100 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-4">
            <Link to="/">
            <img  style={{ height: "4.5rem", width: "auto" }} src="/Text+Logo.svg" alt="LinkedIn"/>
            </Link>
          </div>
          <div className="flex items-center gap-6 md:gap-6">
          <ThemeToggle onThemeChange={handleThemeChange} />
            {authUser ? (
              <>
                <Link to="/network" className="text-neutral flex flex-col items-center relative">
                  <Users color={iconColor} size={20} />
                  {unreadConnectionRequestsCount > 0 && (
                    <span className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs rounded-full size-3 md:size-4 flex items-center justify-center">
                      {unreadConnectionRequestsCount}
                    </span>
                  )}
                </Link>
                <Link to="/notifications" className="text-neutral flex flex-col items-center relative">
                  <Bell color={iconColor} size={20} />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs rounded-full size-3 md:size-4 flex items-center justify-center">
                      {unreadNotificationCount}
                    </span>
                  )}
                </Link>
                <Link to={`/profile/${authUser.username}`} className="text-neutral flex flex-col items-center">
                  <User color={iconColor} size={20} />
                </Link>
                <Link to={`/catalogue`} className="text-neutral flex flex-col items-center">
                  <Album color={iconColor} size={20} />
                </Link>
                <Link to="https://arnavvashisthcodingaccountnew.github.io/TwinModel/" >
                  <Microscope color={iconColor} size={20} />
                </Link>
                <button
									className='flex items-center space-x-1 text-sm text-Tcolor'
									onClick={() => logout()}
								>
									<LogOutIcon color={iconColor} size={20} />
								</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-info btn btn-ghost">
                  Log In
                </Link>
                <Link to="/signup" className="text-info btn btn-ghost">
                  Join now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

