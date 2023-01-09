import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "~/configs/firebase/firebase";
import { collectIdsAndDocs } from "~/shared/utils";

export default async function fetchSearchUsers(searchStr: string) {
  return await new Promise(async (resolve) => {
    const q = query(
      collection(db, "users"),
      where("searchKeywords", "array-contains", searchStr)
    );

    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map(collectIdsAndDocs);
    resolve(data);
  });
}
