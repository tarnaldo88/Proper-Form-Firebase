import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

/**
 * Promote a user to trainer (or set any role) in Firestore users/{uid}.
 * Requires current user to have the custom claim { admin: true }.
 *
 * @param {string} targetUid - The uid of the user to update.
 * @param {('trainer'|'user')} role - The role to set. Defaults to 'trainer'.
 * @returns {Promise<void>}
 */
export async function setUserRole(targetUid, role = 'trainer') {
  if (!auth.currentUser) {
    throw new Error('Not signed in');
  }
  const tokenResult = await auth.currentUser.getIdTokenResult(true);
  const isAdmin = tokenResult?.claims?.admin === true;
  if (!isAdmin) {
    throw new Error('Admin privileges required to change roles');
  }
  if (!targetUid) {
    throw new Error('targetUid is required');
  }
  const userRef = doc(db, 'users', targetUid);
  await updateDoc(userRef, { role });
}

/**
 * Convenience wrapper to promote to trainer specifically.
 * @param {string} targetUid
 */
export async function promoteUserToTrainer(targetUid) {
  return setUserRole(targetUid, 'trainer');
}
