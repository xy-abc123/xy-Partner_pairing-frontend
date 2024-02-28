import myAxios from "../plugins/myAxios";
import { getCurrentUserState, setCurrentUserState } from "../states/user";

export const getCurrentUser = async () => {
    // const currentUser = getCurrentUserState()
    // if (currentUser) {
    //     return currentUser
    // }
    //不存在从远程获取
    const res = await myAxios.get('/user/current')
    if (res.code === 0) {
        // setCurrentUserState(res.data.data)
        return res.data
    }
    return null
}




