import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InvitePage from '../Components/Pages/InvitePage';
import { useParams, useNavigate } from 'react-router-dom';
import { useUserState } from '@/utils/zustand';
import {
  checkUserRoom,
  isNameAvailable,
  initPlayerData,
  addRoomToUser,
} from '@/utils/firebase/firestore';
import { ThemeProvider } from 'styled-components';

const mockTheme = {
  colors: {
    backgroundBlue3: '#123456',
    white: '#ffffff',
  },
  breakpoints: {
    sm: '@media screen and (max-width:1080px)',
  },
};
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('@/utils/zustand', () => ({
  useUserState: jest.fn(),
}));

jest.mock('@/utils/firebase/firestore', () => ({
  checkUserRoom: jest.fn(),
  isNameAvailable: jest.fn(),
  initPlayerData: jest.fn(),
  addRoomToUser: jest.fn(),
}));

jest.mock('@/assets/charNames', () => ({
  catImages: ['cat1.png', 'cat2.png', 'cat3.png'],
}));

describe('InvitePage Component', () => {
  const mockNavigate = jest.fn();
  const mockUser = { id: 'testUserId' };
  const mockParams = { roomId: 'testRoomId', roomName: 'testRoomName' };

  beforeEach(() => {
    useParams.mockReturnValue(mockParams);
    useNavigate.mockReturnValue(mockNavigate);
    useUserState.mockReturnValue({ user: mockUser });
    checkUserRoom.mockResolvedValue(false);
    isNameAvailable.mockResolvedValue(true);
    addRoomToUser.mockResolvedValue(true);
  });

  it('renders InvitePage and handles interactions correctly', async () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <InvitePage />
      </ThemeProvider>
    );
    expect(
      screen.queryByText(`您已被邀請至房間 ${mockParams.roomName}!`)
    ).not.toBeInTheDocument();

    await waitFor(() => expect(checkUserRoom).toHaveBeenCalled());

    expect(
      screen.getByText(`您已被邀請至房間 ${mockParams.roomName}!`)
    ).toBeInTheDocument();

    const nameInput = screen.getByLabelText('角色名稱');
    fireEvent.change(nameInput, { target: { value: 'testCharName' } });
    expect(nameInput.value).toBe('testCharName');

    const joinButton = screen.getByText('加入房間');
    fireEvent.click(joinButton);

    await waitFor(() =>
      expect(isNameAvailable).toHaveBeenCalledWith({
        roomId: mockParams.roomId,
        charName: 'testCharName',
      })
    );
    await waitFor(() => expect(initPlayerData).toHaveBeenCalled());
    await waitFor(() => expect(addRoomToUser).toHaveBeenCalled());

    expect(mockNavigate).toHaveBeenCalledWith(
      `/catertown/${mockParams.roomId}/${mockParams.roomName}`
    );
  });
});
