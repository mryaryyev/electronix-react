import { ReactNode, useState } from "react"
import Cookies from "universal-cookie"
import { GlobalContext } from "../hooks/useGlobals.ts"
import { Member } from "../../libs/types/member"
import useBasket from "../hooks/useBasket"

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies()
  if (!cookies.get("accessToken")) localStorage.removeItem("memberData")

  const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData")!)
      : null,
  )
  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date())
  console.log("=== verify ===")

  return (
    <GlobalContext.Provider
      value={{
        authMember,
        setAuthMember,
        BASKET: useBasket(),
        orderBuilder,
        setOrderBuilder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default ContextProvider
