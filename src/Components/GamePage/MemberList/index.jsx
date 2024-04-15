import styled from "styled-components";
import {useMemo} from "react";
import Cat from "../../Cat";
const MemberIcon = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  background-color: white;
  border: 1px solid #545c8f;
  border-radius: 50%;
  div:first-child {
    position: absolute;
    top: -3px;
    right: 7px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const OnlineStatus = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  right: 4px;
  bottom: 0px;
  border: 2px solid black;
  background-color: ${(props) => (props.$isOnline ? 'green' : 'gray')};
  border-radius: 50%;
`;
const MemberWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const MemberInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
`;
const MemberList = ({ userId, players, onlineStatus }) => {
    // 分离并排序在线和离线成员，不依赖于位置信息
    const { onlineMembers, offlineMembers } = useMemo(() => {
      const online = [];
      const offline = [];
  
      players.forEach(player => {
        const isOnline = onlineStatus[player.userId]?.online || false;
        if (player.userId === userId) {
          isOnline ? online.unshift(player) : offline.unshift(player);
        } else {
          isOnline ? online.push(player) : offline.push(player);
        }
      });
    
      return { onlineMembers: online, offlineMembers: offline };
    }, [players, onlineStatus, userId])
  
    return (
      <MemberWrapper>
        <span>Online Members</span>
        {onlineMembers.map(player => (
          <MemberInfo key={player.userId}>
            <MemberIcon>
              <Cat image={player.character} />
              <OnlineStatus $isOnline={true} />
            </MemberIcon>
            <span>{player.charName}</span>
          </MemberInfo>
        ))}
        <span>Offline Members</span>
        {offlineMembers.map(player => (
          <MemberInfo key={player.userId}>
            <MemberIcon>
              <Cat image={player.character} />
              <OnlineStatus $isOnline={false} />
            </MemberIcon>
            <span>{player.charName}</span>
          </MemberInfo>
        ))}
      </MemberWrapper>
    );
  };
  
  export default MemberList;