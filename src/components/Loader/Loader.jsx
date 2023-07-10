import { InfinitySpin } from 'react-loader-spinner';

export const Loader = () => {
  const style = { textAlign: 'center'};
  return (
    <div style={style}>
      <InfinitySpin color="#fa8703"/>
    </div>
  );
  
};
