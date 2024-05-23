
![Logo](https://firebasestorage.googleapis.com/v0/b/midterm-48c1c.appspot.com/o/Cater%20Logo.png?alt=media&token=c9634c33-ed4d-41d5-925f-d0c3489e53d0)
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


## Demo

- Users can move across the map using the WASD or arrow keys
![Move](/public/tutorial/basic/basic_0.gif)
- After integrating multi-user communication, characters within two squares can identify others participating in the group chat.
![PR](/public/tutorial/communication/communication_1.gif)
- Upon entering a specific area (room), communication is shared with all members present in that room.
![PR](/public/tutorial/communication/communication_3.gif)

### Setting up GitHub webhook
Navigate to the settings of your GitHub repository, add a webhook, paste the Payload URL, set the Content type to application/json, and choose to receive notifications only for Pull Requests.

![Setting webhook](/public/tutorial/permission/permission_3.gif)

- After setting up the GitHub webhook, users with the appropriate permissions can see an exclamation mark above their character's head. Clicking on it displays information about the pull request (PR).
![PR](/public/tutorial/basic/basic_6.gif)