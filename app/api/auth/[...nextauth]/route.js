import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Your username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password,saved } = credentials;
   const user={username,id:password}
        // Replace this logic with your database or API authentication
         
     if(saved){
        return user;
     }
     else{
        return null;
     }
        
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Example: Deny sign-in for a specific condition
      if (!user) {
        throw new Error("User not found");
      }
      return true; // Allow sign-in
    },
    
    async redirect({ url, baseUrl }) {
      // Redirect to a specific page after sign-in
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    
    async session({ session, token }) {
      // Modify the session object
      if (token) {
        // Assuming `token.id` contains the user ID, set it in the session
        session.user.id = token.id;  // Save user ID in session
        // Optionally, you can also set other properties like username
        session.user.username = token.username;  // Save username in session (if available)
      }
      return session;
    },
    
    async jwt({ token, user }) {
      // Add custom claims to the JWT
      if (user) {
        token.id = user.id;  // Assign the user ID to token
        token.username = user.username;  // Optionally, assign the username to token
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
