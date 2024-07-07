// Handle signing out when user presses sign out button
export default function signOut() {
  window.localStorage.clear();
  setTimeout(() => {
    window.location.href = '/';
  }, 1500);
};



