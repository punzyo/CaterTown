import styled from 'styled-components';
import { catsYPositions } from '@/assets/charNames';
interface WrapperProps {
  $image: string;
}

const Wrapper = styled.div<WrapperProps>`
  width: 60px;
  height: 60px;
  background-position: -774px ${catsYPositions.down};
  background-size: 2048px 1088px;
  background-image: url(/images/animals/${(props) => props.$image}.png);
  user-select: none;
`;
interface CatProps {
  image: string;
}
export default function Cat({ image }: CatProps) {
  return <Wrapper $image={`${image}`} />;
}
