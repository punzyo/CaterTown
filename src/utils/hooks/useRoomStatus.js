import { useEffect, useState } from 'react';
import { ref, onDisconnect, onValue, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { rtdb } from '../../firebase/realtime';

export function useRoomStatus({ userId, roomId }) {
    const [onlineStatus, setOnlineStatus] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const userStatusRef = ref(rtdb, `rooms/${roomId}/users/${userId}`);

        update(userStatusRef, { online: true });
        onDisconnect(userStatusRef).update({ online: false });

        const roomUsersRef = ref(rtdb, `rooms/${roomId}/users`);
        const unsubscribe = onValue(roomUsersRef, snapshot => {
            const users = snapshot.val() || {};
            setOnlineStatus(users);
        });

        return () => {
            unsubscribe();
            update(userStatusRef, { online: false });  
        };
    }, [userId, roomId, rtdb, navigate]);

    return onlineStatus;
}


