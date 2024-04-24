import { app } from './firebase';
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  updateDoc,
  collection,
  onSnapshot,
  Timestamp,
  arrayUnion,increment 
} from 'firebase/firestore';
import { creatRtRoom } from './realtime';


export const db = getFirestore(app);

export async function updatePlayerPosition({ userId, userData, roomId }) {
  const roomDocRef = doc(db, 'rooms', roomId);
  console.log(userData);
  try {
    const roomSnap = await getDoc(roomDocRef);
    let usersArray = roomSnap.data().users;
    const userIndex = usersArray.findIndex((user) => user.userId === userId);
    if (userIndex !== -1) {
      usersArray[userIndex].position = {
        top: userData.top,
        left: userData.left,
        direction: userData.direction,
        frame: userData.frame,
      };
    }
    await updateDoc(roomDocRef, {
      users: usersArray,
    });
  } catch (error) {
    console.error('Error updating position: ', error);
  }
}


export async function getOtherPlayersData(excludePlayerId) {
  const roomDocRef = doc(db, 'rooms', '001');

  try {
    const docSnap = await getDoc(roomDocRef);

    if (docSnap.exists()) {
      const roomData = docSnap.data();
      const users = roomData.users.filter(
        (user) => user.userId !== excludePlayerId
      );
      console.log('Other players data:', users);
      return users;
    } else {
      console.log('No such room exists!');
      return {};
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return {};
  }
}

export async function createRoom({
  userId,
  roomName,
  charName,
  character,
  map,
  startingPoint: position,
}) {
  console.log(userId, roomName, charName, character, position, map);
  try {
    const roomDocRef = await addDoc(collection(db, 'rooms'), {
      users: [
        {
          userId,
          charName,
          character,
          position,
          online:false,
        },
      ],
      name: roomName,
      createDate: Timestamp.now(),
      map,
    });
    console.log('Document written with ID: ', roomDocRef.id);
    creatRtRoom(roomDocRef.id)
    return roomDocRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}
export async function joinRoom({roomId, user}) {
  const roomDocRef = doc(db, 'rooms', roomId);

  try {
    await updateDoc(roomDocRef, {
      users: arrayUnion({...user, online:false})
    });
    console.log('User added to room with ID:', roomId);
  } catch (error) {
    console.error('Error joining room:', error);
    throw error; 
  }
}
export async function addRoomToUser({
  userId,
  roomName,
  roomId,
  character,
  charName,
}) {
  const roomDocRef = doc(db, 'users', userId, 'rooms', roomId);

  try {
    await setDoc(
      roomDocRef,
      { roomName, character, charName, joinDate: Timestamp.now() },
      { merge: true }
    );
    console.log(
      "Room with character info set in user's collection with Room ID:",
      roomId
    );
    return true;
  } catch (error) {
    console.error(
      "Error setting room with character info in user's collection:",
      error
    );
    return false;
  }
}

export async function getUserDatabyId(userId) {
  const userDocRef = doc(db, 'users', userId);
  try {
    const docSnap = await getDoc(userDocRef);
    const data = docSnap.data();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

export async function getUserRoomsbyId(userId) {
  const roomsCollectionRef = collection(db,'users', userId, 'rooms');

  try {
    const querySnapshot = await getDocs(roomsCollectionRef);
    const rooms = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return rooms;
  } catch (error) {
    console.error('Error getting user rooms:', error);
    throw new Error('Failed to fetch user rooms.');
  }
}

export async function sendPublicMessage({roomId, charName, message}) {
  const messagesRef = doc(db, `rooms/${roomId}/publicMessages/messages`);

  try {
    // 获取当前的messages文档
    const messagesSnap = await getDoc(messagesRef);

    // 构建新消息对象
    const newMessage = { charName, message,postTime:Timestamp.now()};

    if (messagesSnap.exists()) {
      // 如果messages文档已存在，添加新消息到数组中
      await updateDoc(messagesRef, {
        messages: arrayUnion(newMessage)
      });
    } else {
      // 如果messages文档不存在，首次创建文档并初始化messages数组
      await setDoc(messagesRef, {
        messages: [newMessage]
      });
    }
    console.log("Message added successfully");
  } catch (error) {
    console.error("Error adding message: ", error);
  }
}

export async function sendPrivateMessage({userId,roomId,charName,privateChannelId,message}) {
  try {
    // 排序 userId 和 privateChannelId 以创建一致的 document ID
    const sortedIds = [userId, privateChannelId].sort();
    const documentId = sortedIds.join(''); // 拼接成一个字符串，如 'user1user2'
  
    const messageRef = doc(db, `rooms/${roomId}/users/${documentId}`);
  
    // 获取当前消息文档的快照
    const docSnapshot = await getDoc(messageRef);
    const newMessage = {
      charName,
      message
    };
  
    if (docSnapshot.exists()) {
      // 如果文档已存在，读取现有消息列表并添加新消息
      let currentMessages = docSnapshot.data().messages || [];
      currentMessages.push(newMessage);
      await updateDoc(messageRef, { messages: currentMessages });
    } else {
      // 如果文档不存在，首次创建这个文档并初始化消息列表
      await setDoc(messageRef, { messages: [newMessage] });
    }
  } catch (error) {
    console.error("Failed to send message:", error);
    throw new Error("Failed to send message");
  }
}

export async function addUnreadMessage({roomId, privateChannelId, userId}) {
  try {
    // 定位到特定房间和频道的未读消息文档
    const unreadMsgRef = doc(db, `rooms/${roomId}/unReadMessages/${privateChannelId}`);

    // 获取当前未读消息计数的快照
    const docSnapshot = await getDoc(unreadMsgRef);

    // 检查文档是否存在，并更新或设置未读消息计数
    if (docSnapshot.exists()) {
      // 更新指定用户的未读消息计数
      await updateDoc(unreadMsgRef, {
        [`messages.${userId}.count`]: increment(1)
      });
    } else {
      // 如果未读消息文档不存在，首次为该用户创建未读消息计数
      await setDoc(unreadMsgRef, {
        messages: {
          [userId]: { count: 1 }
        }
      });
    }
    console.log('+++');
  } catch (error) {
    console.error("Failed to add unread message count:", error);
    throw new Error("Failed to update unread message count");
  }
}

export async function resetUnreadMessage({roomId, privateChannelId, userId}) {
  if(!privateChannelId)return
  console.log('rest',roomId, privateChannelId, userId);
  try {
    // 定位到特定房间和频道的未读消息文档
    const unreadMsgRef = doc(db, `rooms/${roomId}/unReadMessages/${userId}`);

    // 获取当前未读消息计数的快照
    const docSnapshot = await getDoc(unreadMsgRef);

    // 检查文档是否存在，并重置未读消息计数
    if (docSnapshot.exists()) {
      // 更新指定用户的未读消息计数为0
      await updateDoc(unreadMsgRef, {
        [`messages.${privateChannelId}.count`]: 0
      });
      console.log('Unread message count reset successfully');
    } else {
      // 如果未读消息文档不存在，日志记录，实际操作可能不需要创建新记录
      console.log('No unread message record to reset');
    }
  } catch (error) {
    console.error("Failed to reset unread message count:", error);
    throw new Error("Failed to reset unread message count");
  }
}


export async function saveUserToFirestore({authID, name, email}) {
  console.log(authID,name);
  try {
    const userRef = doc(db, 'users', authID);
    await setDoc(userRef, {
      name,
      email
    });
    return true
    console.log('User data saved successfully!');
  } catch (error) {
    return false
    console.error('Error saving user data:', error);
  }
}