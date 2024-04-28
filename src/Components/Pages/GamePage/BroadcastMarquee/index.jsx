import Marquee from 'react-fast-marquee';
import { Timestamp } from "firebase/firestore";
export default function BroadcastMarquee({ broadcasts }) {
console.log('54',broadcasts);
  const formattedBroadcasts = broadcasts.map(broadcast => {
    console.log(broadcast.publishTime,'333');
    const fireTimestamp = new Timestamp(broadcast.publishTime.seconds, broadcast.publishTime.nanoseconds)
    const publishTime =  fireTimestamp.toDate();
    console.log(publishTime,'333');
    const formattedTime = `${publishTime.getFullYear()}-${publishTime.getMonth() + 1}-${publishTime.getDate()} ${publishTime.getHours()}:${publishTime.getMinutes()}`;

    return `${broadcast.charName}(${formattedTime}): ${broadcast.content}`;
  });

  const broadcastsString = formattedBroadcasts.join('   ');

  return (
    <Marquee speed={50} gradient={false} pauseOnHover={true}>
      {broadcastsString}
    </Marquee>
  );
}
