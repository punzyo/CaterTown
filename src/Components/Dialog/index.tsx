import { ReactNode, MouseEvent } from 'react';
interface DialogProps {
  children: ReactNode;
  onClickFunc: (event: MouseEvent<HTMLDivElement>) => void;
}

export default function Dialog({ children, onClickFunc }: DialogProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        cursor: 'auto',
        zIndex: 10,
      }}
      onClick={onClickFunc}
    >
      {children}
    </div>
  );
}
