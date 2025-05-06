
import React from "react";
import { Bell, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useDashboardNotifications, DashboardNotification } from "@/hooks/admin/useDashboardNotifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case "alert":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    default:
      return <Info className="h-5 w-5 text-blue-500" />;
  }
};

const NotificationItem = ({
  notification,
  onMarkAsRead
}: {
  notification: DashboardNotification;
  onMarkAsRead: (id: string) => void;
}) => {
  const timeAgo = formatDistanceToNow(new Date(notification.created_at), { 
    addSuffix: true,
    locale: fr
  });

  return (
    <DropdownMenuItem 
      className="p-4 border-b border-graphik-light-grey cursor-pointer hover:bg-graphik-light-grey/10 flex items-start gap-3"
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex-shrink-0 mt-1">
        <NotificationIcon type={notification.notification_type} />
      </div>
      <div className="flex-1">
        <p className="font-medium text-white">{notification.title}</p>
        <p className="text-sm text-gray-400">{notification.message}</p>
        <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
      </div>
    </DropdownMenuItem>
  );
};

const AdminNotifications = () => {
  const { loading, notifications, markAsRead } = useDashboardNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative" size="icon">
          <Bell className="h-5 w-5 text-gray-300" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-graphik-grey border-graphik-light-grey">
        <div className="p-4 border-b border-graphik-light-grey">
          <h2 className="text-lg font-bold text-white">Notifications</h2>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-400">
              Chargement...
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
              />
            ))
          ) : (
            <div className="p-4 text-center text-gray-400">
              Aucune nouvelle notification
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminNotifications;
