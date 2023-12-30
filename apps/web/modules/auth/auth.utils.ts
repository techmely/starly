import { invariant } from "@techmely/utils";
import { ensureInitFirebaseAuth } from "../providers";
import type { SignInOptions, SignInOutput } from "./auth.types";

export function headerWithToken(token: string) {
  invariant(token, "Token is required");
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function signInWithGithub(options: SignInOptions): Promise<SignInOutput> {
  const { signInWithPopup, GithubAuthProvider } = await import("firebase/auth");
  const auth = await ensureInitFirebaseAuth(options.locale);
  const provider = new GithubAuthProvider();
  provider.addScope("user");

  const [popupRes] = await Promise.allSettled([signInWithPopup(auth, provider)]);
  const error = popupRes.status === "rejected" ? popupRes.reason : undefined;
  if (error) {
    return error?.code;
  }
  const result = getFulfilledValue(popupRes);
  const credential = GithubAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;
  const idToken = credential?.idToken;
  const user = result.user;
  // const res = await honoClient.api.v1.auth.register.providers.$post({
  //   json: {
  //     email: user.email || "",
  //     browserVersion: parser?.getBrowser().version || "Unknown",
  //     browserName: parser?.getBrowser().name || "Unknown",
  //     openPlatform: parser?.getOS().name || "Unknown",
  //     ...utmParams.google,
  //     displayName: user.displayName || undefined,
  //     photoURL: user.photoURL || undefined,
  //     isEmailVerified: user.emailVerified,
  //     locale: 'vi',
  //     firebaseUserId: user.uid,
  //     userId: user.uid,
  //   },
  // });
  return { user, token, idToken };
}

export async function signInWithGoogle(options: SignInOptions): Promise<SignInOutput> {
  const { signInWithPopup, GoogleAuthProvider, AuthCredential } = await import("firebase/auth");
  const fbAuth = await ensureInitFirebaseAuth(options.locale);
  const provider = new GoogleAuthProvider();

  provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

  const [popupRes] = await Promise.allSettled([signInWithPopup(fbAuth, provider)]);

  const error = popupRes.status === "rejected" ? popupRes.reason : undefined;
  if (error) {
    return error?.code;
  }
  const result = getFulfilledValue(popupRes);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;
  const idToken = credential?.idToken;
  const user = result.user;
  return { user, token, idToken };
}

export async function signInWithFacebook(options: SignInOptions): Promise<SignInOutput> {
  const { signInWithPopup, FacebookAuthProvider } = await import("firebase/auth");
  const auth = await ensureInitFirebaseAuth(options.locale);
  const provider = new FacebookAuthProvider();

  provider.addScope("email");

  const [popupRes] = await Promise.allSettled([signInWithPopup(auth, provider)]);
  const error = popupRes.status === "rejected" ? popupRes.reason : undefined;
  if (error) {
    return error?.code;
  }
  const result = getFulfilledValue(popupRes);
  const credential = FacebookAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;
  const idToken = credential?.idToken;
  const user = result.user;
  return { user, token, idToken };
}

// const TRANSACTION_RETRY_COUNT = 3;

// let localCache: Record<string, PersistenceValue | null> = {};

// class IndexDbPromise<T> {
// 	constructor(private readonly request: IDBRequest) {}

// 	toPromise(): Promise<T> {
// 		return new Promise<T>((resolve, reject) => {
// 			this.request.addEventListener("success", () => {
// 				resolve(this.request.result);
// 			});
// 			this.request.addEventListener("error", () => {
// 				reject(this.request.error);
// 			});
// 		});
// 	}
// }

// export function openIndexedDb(dbName: string, dbVersion: number): Promise<IDBDatabase> {
// 	const request = indexedDB.open(dbName, dbVersion);
// 	return new Promise((res, rej) => {
// 		request.addEventListener("error", () => {
// 			rej(request.error);
// 		});

// 		request.addEventListener("success", async () => {
// 			const db = request.result;
// 			// Strange bug that occurs in Firefox when multiple tabs are opened at the
// 			// same time. The only way to recover seems to be deleting the database
// 			// and re-initializing it.
// 			// https://github.com/firebase/firebase-js-sdk/issues/634

// 			if (!db.objectStoreNames.contains(FIREBASE_DB_OBJECTSTORE_NAME)) {
// 				// Need to close the database or else you get a `blocked` event
// 				db.close();
// 				await deleteIndexedDb(dbName);
// 				res(await openIndexedDb(dbName, dbVersion));
// 			} else {
// 				res(db);
// 			}
// 		});
// 	});
// }

// export async function withRetriesOpenIndexedDb<T>(
// 	dbName: string,
// 	dbVersion: number,
// 	op?: (db: IDBDatabase) => Promise<T>,
// ): Promise<T | undefined> {
// 	let numAttempts = 0;

// 	while (numAttempts++ < TRANSACTION_RETRY_COUNT) {
// 		try {
// 			const db = await openIndexedDb(dbName, dbVersion);
// 			return await op?.(db);
// 		} catch (e) {
// 			console.error(e);
// 		}
// 	}
// }

// interface DBObject {
// 	[FIREBASE_DB_DATA_KEYPATH]: string;
// 	value: Record<string, unknown>;
// }

// type PersistenceValue = Record<string, unknown> | string;

// export async function getObjectIndexedDb<T extends PersistenceValue>(
// 	dbName: string,
// 	dbVersion: number,
// 	dbObjectStorageName: string,
// 	key: string,
// ) {
// 	const obj = (await withRetriesOpenIndexedDb(dbName, dbVersion, (db) => {
// 		return getObject(db, dbObjectStorageName, key);
// 	})) as T;
// 	localCache[key] = obj;
// 	return obj;
// }

// async function getObject(
// 	db: IDBDatabase,
// 	dbObjectStorageName: string,
// 	key: string,
// ): Promise<Record<string, unknown> | null> {
// 	const request = getObjectStore(db, dbObjectStorageName, false).get(key);
// 	const data = await new IndexDbPromise<DBObject | undefined>(request).toPromise();
// 	return data === undefined ? null : data.value;
// }

// function getObjectStore(
// 	db: IDBDatabase,
// 	dbObjectStorageName: string,
// 	isReadWrite: boolean,
// ): IDBObjectStore {
// 	return db
// 		.transaction([dbObjectStorageName], isReadWrite ? "readwrite" : "readonly")
// 		.objectStore(dbObjectStorageName);
// }

// async function putObjectIndexedDb(
// 	db: IDBDatabase,
// 	key: string,
// 	dbObjectStorageName: string,
// 	value: Record<string, any> | string,
// ): Promise<void> {
// 	const request = getObjectStore(db, dbObjectStorageName, true).put({
// 		[FIREBASE_DB_DATA_KEYPATH]: key,
// 		value,
// 	});
// 	return new IndexDbPromise<void>(request).toPromise();
// }

// function deleteIndexedDb(dbName: string): Promise<void> {
// 	const request = indexedDB.deleteDatabase(dbName);
// 	return new IndexDbPromise<void>(request).toPromise();
// }
