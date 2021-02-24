import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Redirect = ({ to }: { to: string }) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;

  // router.push(to);
  // return null;
};

export default Redirect;
