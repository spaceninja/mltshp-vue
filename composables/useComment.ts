import { MltshpComment } from '~/types/MltshpComment';

const useComment = () => {
  const replyTo = useState('reply-to', () => '');

  const postedComments: Ref<MltshpComment[]> = useState(
    'posted-comments',
    () => []
  );

  const resetCommentState = () => {
    replyTo.value = '';
    postedComments.value = [];
  };

  return { replyTo, postedComments, resetCommentState };
};

export default useComment;
