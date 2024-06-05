import SendIcon from "./icons/send";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Chat() {
  const users = [
    { id: 1, user: "1", me: false },
    { id: 2, user: " 2", me: true },
    { id: 3, user: "3", me: false },
    { id: 4, user: "4", me: false },
    { id: 5, user: "3", me: false },
    { id: 6, user: "4", me: false },
    { id: 7, user: "3", me: false },
    { id: 8, user: "4", me: false },
    { id: 9, user: "3", me: false },
    { id: 10, user: "4", me: false },
    { id: 11, user: "3", me: false },
    { id: 12, user: "4", me: false },
  ];
  return (
    <div className="flex flex-1 flex-col">
      <div className="h-[calc(100vh-128px)] overflow-y-auto px-6 py-4">
        <div className="space-y-4">
          {users.map((user, index) => {
            return user.me ? (
              <div key={index} className="flex items-start gap-4 justify-end">
                <div className="flex flex-col gap-2">
                  <div className="rounded-lg bg-blue-500 p-3 text-sm text-white">
                    I'm doing great, thanks for asking!
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    2:31 PM
                  </span>
                </div>
                <Avatar className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700">
                  <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <div key={index} className="flex items-start gap-4">
                <Avatar className="h-10 w-10 border-2 border-gray-200 dark:border-gray-700">
                  <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
                  <AvatarFallback>{user.user}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <div className="rounded-lg bg-gray-200 p-3 text-sm text-gray-900 dark:bg-gray-800 dark:text-gray-50">
                    Hey, how's it going?
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    2:30 PM
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-800">
        <form className="flex items-center gap-4">
          <Input
            autoComplete="off"
            className="flex-1"
            id="message"
            placeholder="Type your message..."
          />
          <Button
            className="rounded-full"
            size="icon"
            type="submit"
            variant="ghost"
          >
            <SendIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </Button>
        </form>
      </div>
    </div>
  );
}
