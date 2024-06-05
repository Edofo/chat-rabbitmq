import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export function Contact(props: any) {

return (
<Link
            className="flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-750"
            href="#"
          >
            <Avatar className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700">
              <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>{props.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                {props.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {props.message}
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
    )
}