import { AuthUser } from '~/types/AuthUser';
import { MltshpFile } from '~/types/MltshpFile';

const usePost = () => {
  // Is this a post by the user? If so, we'll hide the like button, etc.
  const isOwnPost = (post: MltshpFile, user: AuthUser | undefined) =>
    post.user.name === user?.name;

  return { isOwnPost };
};

export default usePost;
