import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css';
export default function RoomSkeleton() {
  return (
    Array.from({ length: 6 }, (_, index) => (
        <div key={index}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 5px',
            }}
          >
            <Skeleton
              baseColor="#ddd"
              highlightColor="#f0f0f0"
              width={0}
              height={20}
            />
            {/* <Skeleton
              baseColor="#ddd"
              highlightColor="#f0f0f0"
              width={20}
              height={20}
            /> */}
          </div>
          <Skeleton
            baseColor="#ddd"
            highlightColor="#f0f0f0"
            height={284}
            borderRadius={10}
          />
          {/* <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Skeleton
                baseColor="#ddd"
                highlightColor="#f0f0f0"
                width={50}
                height={50}
                borderRadius={10}
              />
              <Skeleton
                baseColor="#ddd"
                highlightColor="#f0f0f0"
                width={60}
                height={20}
              />
            </div>
            <Skeleton
              baseColor="#ddd"
              highlightColor="#f0f0f0"
              width={200}
              height={20}
            />
          </div> */}
        </div>
      ))
  )
}