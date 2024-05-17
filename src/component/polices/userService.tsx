export const userService = {
    get getCurrentUserRoles(): any {
      const user = localStorage.getItem('name')
      if (user) {
        const data = JSON.parse(user)
  
        return data.roles
      }
      return []
    },

    get currentRole(): any {
      const role = localStorage.getItem('name')
      return role ? JSON.parse(role) : null
    },
    
    get currentUser(): any {
      const user = localStorage.getItem('name')
      return user ? JSON.parse(user) : null
    },

    get token(): any {
      const data = localStorage.getItem('token')
      return data ? data : null
    },
  }