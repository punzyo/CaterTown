import { useEffect, useState } from 'react';
import { ref, onDisconnect, onValue, update, getDatabase } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export function useRoomStatus({ userId, roomId }) {
    const [onlineStatus, setOnlineStatus] = useState({});
    const navigate = useNavigate();
    const db = getDatabase();

    useEffect(() => {
        const userStatusRef = ref(db, `rooms/${roomId}/users/${userId}`);

        // 设置用户在线，并确保不覆盖其他数据
        update(userStatusRef, { online: true });
        onDisconnect(userStatusRef).update({ online: false });

        const roomUsersRef = ref(db, `rooms/${roomId}/users`);
        const unsubscribe = onValue(roomUsersRef, snapshot => {
            const users = snapshot.val() || {};
            setOnlineStatus(users);
        });

        // 组件卸载时设置用户离线
        return () => {
            unsubscribe();
            update(userStatusRef, { online: false });  // 更新，而不是设置，以保持其他数据
        };
    }, [userId, roomId, db, navigate]);

    return onlineStatus;
}


