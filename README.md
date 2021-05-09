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

- [x] add the date in the zip file architecture
- [x] make the deletion of an event safer
- [x] show a spinner while sharing the zip file
- [x] display the app version on the home screen
- [ ] show a toast when an operation is a success or a failure
- [ ] implement generic components : top bar
- [ ] add suggestion for product name input
- [ ] investigate if any optimization is possible
- [ ] try another SGDF font
- [ ] create global style file
- [ ] hide the event name while the font is not loaded
- [ ] add a help section
- [ ] remove the loop of event in the library
- [ ] select the current event when comming back from the camera
- [ ] start to do some tests
- [ ] write some documentation

**_v1.2_**

- refactor the homescreen in smaller components
- refactor the camera validate modal in smaller components
- disable snap button when taking a picture
- find better names for camera and library links
- fix scoll in library
- display the date in letters
- upgrade to sdk 41
- remove "no camp" in the picker when there is at least one existing camp
- disable go to camera or library screen when no event is selected
- disable take picture button when no photo is taken
- add back button in library
- add navigation button in library between dates
- delete projects
- blur background when modal appears
- blur background when preview picture
- install sgdf fonts

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
