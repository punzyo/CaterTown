import styled from 'styled-components';
import { catsYPositions } from '@/assets/charNames';
const Wrapper = styled.div`
  width: 60px;
  height: 60px;
  background-position: -774px ${catsYPositions.down};
  background-size: 2048px 1088px;
  background-image: url(/images/animals/${(props) => props.$image}.png);
  user-select: none;
`;

export default function Cat({ image }) {
  return <Wrapper $image={`${image}`} />;
}
