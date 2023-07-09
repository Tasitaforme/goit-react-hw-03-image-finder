import { InfinitySpin } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled';

export const Loader = () => {
  return <LoaderWrap>
    <InfinitySpin width="500" color="#fa8703" />;
  </LoaderWrap>
  
};
