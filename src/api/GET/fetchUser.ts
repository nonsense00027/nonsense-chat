import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/configs/firebase/firebase";

export default async function fetchUser() {
  return await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
}
