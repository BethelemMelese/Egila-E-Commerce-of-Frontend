export const userService = {
    get getCurrentUserRoles(): any {
      const user = localStorage.getItem('fullName')
      if (user) {
        const data = JSON.parse(user)
  
        return data.roles
      }
      return []
    },

    get currentRole(): any {
      const role = localStorage.getItem('fullName')
      return role ? JSON.parse(role) : null
    },
    
    get currentUser(): any {
      const user = localStorage.getItem('fullName')
      return user ? JSON.parse(user) : null
    },

    get token(): any {
      const data = localStorage.getItem('token')
      return data ? data : null
    },
  }