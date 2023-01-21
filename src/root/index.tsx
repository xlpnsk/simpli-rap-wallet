import { Session } from "@supabase/supabase-js";
import * as React from "react";
import { useSession } from "../hooks/useSession";
import { AuthorizedStack } from "./AuthorizedStack";
import { UnauthorizedStack } from "./UnauthorizedStack";

export const SessionContext = React.createContext<Session | null>(null);

export default function RootNavigation() {
  const session = useSession();
  return (
    <SessionContext.Provider value={session}>
      {session && session.user ? <AuthorizedStack /> : <UnauthorizedStack />}
    </SessionContext.Provider>
  );
}
