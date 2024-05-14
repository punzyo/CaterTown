export const tutorialContent = {
  basic: [
    {
      title: '角色移動',
      content:
        '可以透過WASD，或是方向鍵的上、下、左、右對角色進行移動，碰到障礙物或是地圖邊界時則會停下。',
      mediaType: 'gif',
    },
    {
      title: '獲取邀請連結',
      content: '點擊上方的圖示可以獲得此房間的邀請連結。',
    },
    {
      title: '控制側邊欄',
      content: '點擊下方欄的圖示以隱藏/顯示側邊欄。',
    },
    {
      title: '離開房間',
      content: '點擊右下角圖示即可離開房間。',
    },
    {
      title: '傳遞文字訊息',
      content:
        '可以透過全體頻道向所有人發送訊息，或是點擊他人頭像進行一對一的聊天。',
    },
    {
      title: '打開個人面板',
      content:
        '這裡可以輸入您的GitHub，如果權限為manager以上，可以使用權限相關的系統。',
    },
    {
      title: 'Pull request系統',
      content:
        '當設置好 GitHub webhook後，若您的角色有至少一則pull request，頭上將會冒出驚嘆號通知，自己或是權限為manager以上的角色都會看到。',
      mediaType: 'gif',
    },
  ],
  communication: [
    {
      title: '加入多人通訊',
      content: '按下多人通訊的按鈕，連線成功後即可以進行多人視/音訊連線。',
    },
    {
      title: '視/音訊距離',
      content:
        '當進入多人通訊後，只要角色彼此在兩格內的距離，就能看到對方的通訊畫面。',
      mediaType: 'gif',
    },
    {
      title: '房間系統(1/2)',
      content: '島上共有四個獨立的房間，如上圖。',
    },
    {
      title: '房間系統(2/2)',
      content: '只要在房間內，角色就只能接收同個空間的視/音訊，無視距離。',
      mediaType: 'gif',
    },
    {
      title: '通訊裝置選擇',
      content: '可以點擊圖標右側的按鈕選擇視音訊的輸入源。',
    },
    {
      title: '螢幕分享',
      content: '點擊下方螢幕圖示可以對畫面進行分享。',
    },
    {
      title: '全螢幕，音量控制',
      content: '點擊視訊畫面右下角可以進行全螢幕，左下角則是音量控制。',
    },
    {
      title: '退出多人通訊',
      content: '點擊右方的按鈕將會離開多人通訊，將不會發送/接收通訊內容。',
    },
  ],
  permission: [
    {
      title: '權限功能',
      content:
        '如果權限為teacher以上，可以使用GitHub webhook link，廣播通知的功能。權限admin以上可以更改他人權限等級。',
    },
    {
      title: '發布廣播',
      content:
        '選擇廣播標題、時長、和內容後，點擊發佈廣播即可在畫面上方看到廣播內容。註：廣播內容接受Markdown語法。',
    },
    {
      title: '刪除廣播',
      content: '若您是發佈廣播者，對廣播內容點擊左鍵，確認後即可刪除此通知。',
    },
    {
      title: 'GitHub webhook',
      content:
        '到GitHub repository的settings，在新增webhook中的Payload URL 貼上連結，並將Content type設置為application/json，並接收Pull requests通知。',
      mediaType: 'gif',
    },
    {
      title: '更改權限',
      content:
        '權限為creater > admin > manager > member，creater和admin擁有升降階的功能，最多提升到自己下一層的階級。',
    },
  ],
};
