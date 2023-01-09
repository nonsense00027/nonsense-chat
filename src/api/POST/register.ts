import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getSearchKeywords } from "~/shared/utils";
import { auth, db, storage } from "../../configs/firebase/firebase";
import { RegisterParams } from "../../shared/models";

export default async function register({
  email,
  password,
  file,
  displayName,
}: RegisterParams) {
  const res = await createUserWithEmailAndPassword(auth, email, password);

  if (file) {
    const storageRef = ref(
      storage,
      `photoURLS/${displayName.split(" ").join("")}`
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "users", res.user.uid), {
            id: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
            searchKeywords: getSearchKeywords(displayName),
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});
        });
      }
    );
  }
}
