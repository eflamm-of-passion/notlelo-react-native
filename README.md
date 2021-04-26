# run the project

Install **npm** via **nvm**:  
https://github.com/nvm-sh/nvm

Install **expo** : https://docs.expo.io/get-started/installation/

# how to deploy on android

Increment the android.versionCode in the app.json
Run `expo build:android`, wait for the build to finish. Then download it on https://expo.io/.

Go to https://play.google.com/console/ and create an new release.

# realeases notes

**_next release_**

[x] refactor the homescreen in smaller components  
[x] refactor the camera validate modal in smaller components  
[ ] take multiple pictures at the same time  
[ ] find better names for camera and library links  
[ ] display the date in letters  
[ ] check the permissions  
[ ] investigate the "none" bug  
[ ] disable take picture button when no photo is taken  
[ ] remove the loop of event in the library  
[ ] create a default event, when no event is selected  
[x] add back button in library  
[ ] add navigation button in library between dates  
[ ] delete projects  
[x] blur background when modal appears  
[x] blur background when preview picture  
[ ] style the pickers  
[ ] start some tests

**_v1.1_**

- make sure the event title is not too big, and the hare button is visible
- view pager by dates
- refactor the code in smaller components
- install EsLint and Prettier
- suggest event, as a <select></select>
- refactor the EventService to be React compliant
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
