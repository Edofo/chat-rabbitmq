import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import PlusIcon from "./icons/plus";
import { Button } from "./ui/button";

import { Contact } from "./contact";
import { MessageCircleIcon } from "lucide-react";


const users = [
  { id: 1, name: "Nolan", message: "Go Dev!" },
  { id: 2, name: "Chahine", message: "Va checker mon app de reconaissance facial en Rust" },
  { id: 3, name: "Bakary", message: "Incroyable le shell!" },
  { id: 4, name: "Aymene", message: "Bientôt chez Tiktok!" },
  { id: 5, name: "Romain", message: "Incroyable les vacances en Grèce !" },
];

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
          {
            users.map((user) => (<Contact key={user.id} avatar={user.name.substring(0, 2)} name={user.name} message="Go Dev!" room_id="1"/>))
          }
          {/* <Contact avatar="NL" name=users={.} message="Go Dev!" room_id="1"/>
          <Contact avatar="CB" name="Chahine" message="Va checker mon app de reconaissance facial en Rust" room_id="2"/>
          <Contact avatar="BK" name="Bakary" message="Incroyable le shell!" room_id="3"/>
          <Contact avatar="AB" name="Aymene" message="Bientôt chez Tiktok!" room_id="4"/>
          <Contact avatar="RM" name="Romain" message="Incroyable les vacances en Grèce !" room_id="5"/> */}
        </div>
      </div>
    </div>
  );
}


