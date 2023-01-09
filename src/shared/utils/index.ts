import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const collectIdsAndDocs = (
  doc: QueryDocumentSnapshot<DocumentData>
) => ({ ...doc.data(), id: doc.id });

export const getSearchKeywords = (str: string) => {
  return str
    .split("")
    .map((char: string, i: number) => str.slice(i).toLowerCase())
    .reduce(
      (acc: string[], curr: string) =>
        acc.concat(
          curr
            .split("")
            .map((_: string, i: number) => curr.slice(0, i + 1).toLowerCase())
        ),
      []
    );
};
