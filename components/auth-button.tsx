"use client";

import { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";

const AuthButton = () => {
  const { data: session, isPending } = authClient.useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isPending) {
    return (
      <Button variant="outline" size="sm" disabled className="opacity-50">
        Loading...
      </Button>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-8 h-8 rounded-full border border-border"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border border-border">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
          <span className="text-sm font-medium hidden sm:inline-block">
            {session.user.name || session.user.email}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            await authClient.signOut();
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="default"
      size="sm"
      onClick={async () => {
        await authClient.signIn.social({
          provider: "github",
          callbackURL: "/",
        });
      }}
    >
      <svg
        className="w-4 h-4 mr-2"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
      Sign in with GitHub
    </Button>
  );
};

export default AuthButton;