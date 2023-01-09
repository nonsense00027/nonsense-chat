import React from "react";
import { useAuthUser } from "@react-query-firebase/auth";

import { auth } from "~/configs/firebase/firebase";

function useCurrentUser() {
  return useAuthUser(["user"], auth);
}

export default useCurrentUser;
