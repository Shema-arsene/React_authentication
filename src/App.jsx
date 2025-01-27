import React from "react"
import { useState, useEffect } from "react"
import { supabase } from "../SupabaseClient"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"

const App = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signout = async () => {
    const { error } = await supabase.auth.signOut()
  }

  const signup = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  if (!session) {
    return (
      <>
        {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /> */}
        <div className="flex items-center justify-center h-screen w-full">
          <button
            onClick={signup}
            className="border-2 border-black py-3 px-5 rounded-xl cursor-pointer font-semibold hover:text-white hover:bg-black duration-500"
          >
            Sign in with Google
          </button>
        </div>
      </>
    )
  } else {
    return (
      <div className="h-screen flex flex-col gap-10 items-center justify-center font-semibold">
        <p>Welcome {session?.user?.email}</p>
        <button
          onClick={signout}
          className="border-2 border-black py-2 px-4 rounded-xl hover:text-white hover:bg-black duration-500 cursor-pointer"
        >
          Signout
        </button>
      </div>
    )
  }
}

export default App
