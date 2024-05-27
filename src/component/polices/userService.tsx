export const userService = {
  get currentRole(): any {
    const role = localStorage.getItem("role");
    return role ? role : null;
  },

  get currentUser(): any {
    const user = localStorage.getItem("name");
    return user ? user : null;
  },

  get token(): any {
    const data = localStorage.getItem("token");
    return data ? data : null;
  },
};
