import Image from 'next/image';

const Loading = () => {
  return (
    <Image src="/loading.gif" alt="Loading..." width={100} height={100} />
  );
};

export default Loading;
