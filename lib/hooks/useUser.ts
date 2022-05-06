import { useAuthUser } from "@react-query-firebase/auth"
import { User } from "firebase/auth"
import { UseQueryResult } from "react-query"

import { auth } from "../firebaseClient"

export function useUser(): UseQueryResult<User>{
    return useAuthUser('user', auth);
}