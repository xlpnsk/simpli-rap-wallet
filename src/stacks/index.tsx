import { useAuth } from "../hooks/useAuth";
import { AuthorizedStack } from "./AuthorizedStack";
import { UnauthorizedStack } from "./UnauthorizedStack";

export default function RootNavigation() {
  const { user } = useAuth();

  return !user ? <AuthorizedStack /> : <UnauthorizedStack />;
}
