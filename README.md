# run the project

Install **npm** via **nvm**:  
https://github.com/nvm-sh/nvm

Install **expo** : https://docs.expo.io/get-started/installation/

# how to deploy on android

Increment the android.versionCode in the app.json
Run `expo build:android`, wait for the build to finish. Then download it on https://expo.io/.

Go to https://play.google.com/console/ and create an new release.

# troubleshoot

`Error: ENOSPC: System limit for number of file watchers reached`

Close VS Code, then run `npm start` and reopen VS Code.

# changelog

**_next release_**

- [ ] remove the loop of event in the library
- [ ] start to do some tests
- [ ] write some documentation

**_v1.2_**

- [x] refactor the homescreen in smaller components
- [x] refactor the camera validate modal in smaller components
- [x] disable snap button when taking a picture
- [x] find better names for camera and library links
- [x] fix scoll in library
- [x] display the date in letters
- [x] upgrade to sdk 41
- [x] remove "no camp" in the picker when there is at least one existing camp
- [x] disable go to camera or library screen when no event is selected
- [x] disable take picture button when no photo is taken
- [x] add back button in library
- [x] add navigation button in library between dates
- [x] delete projects
- [x] blur background when modal appears
- [x] blur background when preview picture
- [x] install sgdf fonts

**_v1.1_**

- make sure the event title is not too big, and the hare button is visible
- view pager by dates
- refactor the code in smaller components
- install EsLint and Prettier
- suggest event, as a <select></select>
- refactor the event-service to be React compliant
- install EsLint and Prettier
- display readable date
- remove all Math.random() in loops
- choose an event to view in library
- choose an event to take pictures
- create new event
- choose a default meal when taking a picture
- enter a new meal if wanted when taking a picture

source of icons :  
www.svgrepo.com
