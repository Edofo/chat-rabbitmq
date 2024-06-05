import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import PlusIcon from "./icons/plus";
import { Button } from "./ui/button";

export function Sidebar() {
  return (
    <div className="border-r bg-gray-50 dark:border-gray-800 dark:bg-gray-850">
      <div className="flex h-16 items-center justify-between border-b px-6 dark:border-gray-800">
        <h2 className="text-sm font-medium text-gray-700 dark:text-gray-400">
          Active Users
        </h2>
        <Button className="rounded-full" size="icon" variant="ghost">
          <PlusIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </Button>
      </div>
      <div className="h-[calc(100vh-64px)] overflow-y-auto">
        <div className="space-y-4 p-4">
          <Link
            className="flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750"
            href="#"
          >
            <Avatar className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700">
              <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                John Doe
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Hey, how's it going?
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                2:30 PM
              </span>
              <Badge className="mt-1 bg-green-100 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900/20 dark:text-green-400">
                Online
              </Badge>
            </div>
          </Link>
          <Link
            className="flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750"
            href="#"
          >
            <Avatar className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700">
              <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                Jane Doe
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Hey, did you see the new update?
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                1:45 PM
              </span>
              <Badge className="mt-1 bg-green-100 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900/20 dark:text-green-400">
                Online
              </Badge>
            </div>
          </Link>
          <Link
            className="flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750"
            href="#"
          >
            <Avatar className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700">
              <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                Bob Smith
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Hey, let's catch up later!
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                12:30 PM
              </span>
              <Badge className="mt-1 bg-green-100 px-2 py-1 text-xs font-medium text-green-600 dark:bg-green-900/20 dark:text-green-400">
                Online
              </Badge>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
