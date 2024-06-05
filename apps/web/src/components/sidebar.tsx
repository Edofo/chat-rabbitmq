import PlusIcon from "./icons/plus";
import { Button } from "./ui/button";
import { Contact } from "./contact";

const users = [
  { id: 1, name: "Nolan", message: "Go Dev!" },
  {
    id: 2,
    name: "Chahine",
    message: "Va checker mon app de reconnaissance faciale en Rust",
  },
  { id: 3, name: "Bakary", message: "Incroyable le shell!" },
  { id: 4, name: "Aymene", message: "Bientôt chez Tiktok!" },
  { id: 5, name: "Romain", message: "Incroyable les vacances en Grèce !" },
];

export function Sidebar() {
  return (
    <div className="border-r bg-gray-50 dark:border-gray-800 dark:bg-gray-850">
      <div className="flex h-16 items-center justify-between border-b px-6 dark:border-gray-800">
        <h2 className="text-sm font-medium text-gray-700 dark:text-gray-400">
          Utilisateurs actifs
        </h2>
        <Button className="rounded-full" size="icon" variant="ghost">
          <PlusIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </Button>
      </div>
      <div className="h-[calc(100vh-64px)] overflow-y-auto">
        <div className="space-y-4 p-4">
          {users.map((user) => (
            <Contact
              key={user.id}
              avatar={user.name.substring(0, 2)}
              name={user.name}
              message={user.message}
              room_id={String(user.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
