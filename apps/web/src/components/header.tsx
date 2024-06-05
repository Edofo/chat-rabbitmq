import SearchIcon from "./icons/search";
import SettingsIcon from "./icons/settings";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:border-gray-800 dark:bg-gray-800">
      <div className="flex items-center gap-4">
        <Avatar className="h-8 w-8 border-2 border-gray-200 dark:border-gray-700">
          <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Chat App
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Button className="rounded-full" size="icon" variant="ghost">
          <SearchIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </Button>
        <Button className="rounded-full" size="icon" variant="ghost">
          <SettingsIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </Button>
      </div>
    </header>
  );
}
