import { projectAuth } from "../firebase/config";

const useGetUser = () => {
    const user = projectAuth.currentUser;
    return { user };
};

export default useGetUser;
