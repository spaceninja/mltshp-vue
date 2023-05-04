const useComment = () => {
  const replyTo = useState('reply-to', () => '');

  return { replyTo };
};

export default useComment;
