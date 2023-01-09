import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "~/configs/firebase/firebase";

import { LoginParams } from "shared/models";

export default async function login({ email, password }: LoginParams) {
  await signInWithEmailAndPassword(auth, email, password);
}
