
<p align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/midterm-48c1c.appspot.com/o/Cater%20Logo.png?alt=media&token=c9634c33-ed4d-41d5-925f-d0c3489e53d0" style="margin: 0 auto; display: block;">
</p>


# Cater Town

[Cater Town](https://catertown.site/) offers a virtual environment where users can choose their characters and move through the platform to collaborate remotely. It features text communication, audio-visual connections, and tracking the progress of GitHub pull requests.
## About
- Implemented multi-user audio-visual communication using WebRTC SFU through LiveKit.

- Set up user authentication and navigation mechanisms with Firebase Authentication.

- Developed an Express server to handle GitHub webhooks and manage LiveKit service tokens.

- Utilized Firebase's onSnapshot and WebSocket functions for real-time character movement and online presence monitoring.

- Employed Zustand for state management across components.


## Bulit with

![React](https://camo.githubusercontent.com/3babc94d778f96441b3a66615fb5ee88c6ed04f174ed49b04df92b071a7d0e80/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f72656163742d2532333230323332612e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d253233363144414642)
![Static Badge](https://img.shields.io/badge/STYLED--COMPONENTS-ffca28?style=for-the-badge&logo=styledcomponents&logoColor=white&color=%2338b2ac)
![Firebase](https://camo.githubusercontent.com/f34df100c34fada6dbfa7768b87a078ebbeeb932cbba71916f3f9e35e3107156/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f66697265626173652d6666636132383f7374796c653d666f722d7468652d6261646765266c6f676f3d6669726562617365266c6f676f436f6c6f723d626c61636b)
![TypeScript](https://img.shields.io/badge/TYPESCRIPT-ffca28?style=for-the-badge&logo=typescript&logoColor=white&color=%232c8ebb)
![Git](https://camo.githubusercontent.com/3d768e26ac10ba994a60ed19acd487895cc43a9cdd43e9305c2408b93136234d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769742d2532334630353033332e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d676974266c6f676f436f6c6f723d7768697465)




**Client:**
- React
- Zustand 
- Styled-components
- TypeScript
- Firebase
- LiveKit

**Server:**
- Express


## Test account

password: 000000
- account: `test01@mail.com`  
- account: `test02@mail.com`  
- account: `test03@mail.com`  

## Demo

- Users can move across the map using the WASD or arrow keys  
  <img src="/public/tutorial/basic/basic_0.gif" style="width:500px"/>
  
- After integrating multi-user communication, characters within two squares can identify others participating in the group chat. 
  <img src="/public/tutorial/communication/communication_1.gif" style="width:500px"/>

- Upon entering a specific area (room), communication is shared with all members present in that room.
  <img src="/public/tutorial/communication/communication_3.gif" style="width:500px"/>

### Setting up GitHub webhook
Navigate to the settings of your GitHub repository, add a webhook, paste the Payload URL, set the Content type to application/json, and choose to receive notifications only for Pull Requests.  
<img src="/public/tutorial/permission/permission_3.gif" style="width:500px"/>

- After setting up the GitHub webhook, users with the appropriate permissions can see an exclamation mark above their character's head. Clicking on it displays information about the pull request (PR).  
  <img src="/public/tutorial/basic/basic_6.gif" style="width:500px"/>

## Contact

<a href="https://www.linkedin.com/in/yililin0327/" rel="nofollow">
    <img src="https://camo.githubusercontent.com/591c02e8ff595d43e0b35b1b29aed639a7154b959cd8f8c854b9e176d885b094/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c696e6b6564496e2d3030373742353f7374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white" style="max-width: 100%;">
</a>
<a href="mailto:hellomickey004@gmail.com">
    <img src="https://camo.githubusercontent.com/71a0f4bfcf1f2220e2b1c246ac2ee681c47ee914d1c1f0e27a0e6c9ac2e9f134/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f476d61696c2d4431343833363f7374796c653d666f722d7468652d6261646765266c6f676f3d676d61696c266c6f676f436f6c6f723d7768697465" data-canonical-src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&amp;logo=gmail&amp;logoColor=white" style="max-width: 100%;">
  </a>
