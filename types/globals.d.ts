export {}

export type Roles = "admin" // Can add more if needed

declare global {
  
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles
            isAdmin?: boolean
        }
    }
}
