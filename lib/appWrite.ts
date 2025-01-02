import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.jsm.gads-aora',
	projectId: '6776781a00022c171399',
	databaseId: '677679de00210132b9a7',
	userCollectionId: '67767a00003080326f99',
	videoCollectionId: '67767a1d001a8b03f844',
	storageId: '67767b63002e0cc5a0c6'
};

let client: Client;
let account: Account;

client = new Client();
client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId) // Your Project ID
	.setPlatform(appwriteConfig.platform); // Your platform name;

account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email: string, password: string, username: string) {
	try {
		const newAccount = await account.create(ID.unique(), email, password, username);

		if (!newAccount) throw Error;

    const avatarURL = avatars.getInitials(username);

		await signIn(email, password);

		const newUser = await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email: email,
				username: username,
        avatar: avatarURL
			}
		);

		return newUser;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Sign In
export async function signIn(email: string, password: string) {
	try {
		const session = await account.createEmailPasswordSession(email, password);

		return session;
	} catch (error: any) {
		throw new Error(error);
	}
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Get all video Posts
export async function getAllPosts() {
	try {
	  const posts = await databases.listDocuments(
		appwriteConfig.databaseId,
		appwriteConfig.videoCollectionId
	  );
  
	  return posts.documents;
	} catch (error: any) {
	  throw new Error(error);
	}
  }