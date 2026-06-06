import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY= "access_token"
const USER_KEY="User"

export const setAuthData = async (
    token:string,
    user:unknown
) => {
    await AsyncStorage.setItem(
        TOKEN_KEY,
        token
    )
    await AsyncStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
    )
}

export const getToken = async () => {
    return AsyncStorage.getItem(
        TOKEN_KEY
    )
}

export const getUser= async () => {
    const user = await AsyncStorage.getItem(
        USER_KEY
    )
    return user ? JSON.parse(user):null;
}

export const removeData= async () => {
    await AsyncStorage.removeItem(
        TOKEN_KEY
    );
    await AsyncStorage.removeItem(
        USER_KEY
    )
}