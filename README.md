# notlelo

During the summer camps and other events of the Scouts et Guides de France the scout leaders are asked to record every preprared food by keeping their batch number. It is often a tedious task that does not bring any value to the camp itself, only in case of food intoxication, but usually it is mostly a waste of time. The motivation behind the development of this application is to reduce the time spent on the record of the batch numbers.

Notlelo is meant to take pictures of these batch numbers during the preparation of every meal. Then at the end of the camp the user will export all the pictures in an archive, where they are sorted by date, then by meal, then by product. And this archive will be stored on a device for the legal term specified in the Guide Réglementaire.

## Run the project

Install **npm** via **nvm**:  
https://github.com/nvm-sh/nvm

Install **expo** : https://docs.expo.io/get-started/installation/

## Data structure

The library AynscStorage from React Native is used to store the data. For convenience during the insertion of data, it is an array of products, with a flat object structure for each product, for example :

```json
[
  {
    "uuid": "101b1b75-5861-4464-9d70-f6f3a193fe32",
    "event": "Camp bleu ",
    "date": "06-06-2021",
    "meal": "Petit-déjeuner",
    "name": "Brioche",
    "photos": [
      {
        "uri": "file:///storage/emulated/0/Pictures/Notlelo/0b9fb25e-c80a-4d5e-8e33-057a25f3769d.jpg",
        "creationDate": 1623007351000
      },
      {
        "uri": "file:///storage/emulated/0/Pictures/Notlelo/799190a0-e03d-4952-85cd-6a6c6d0c24ab.jpg",
        "creationDate": 1623007351000
      }
    ]
  },
  {
    "uuid": "f5475005-f53c-4407-b708-e5c33c16c420",
    "event": "Camp bleu ",
    "date": "06-06-2021",
    "meal": "Déjeuner",
    "name": "Pâtes",
    "photos": [
      {
        "uri": "file:///storage/emulated/0/Pictures/Notlelo/b6603d08-5149-4b0e-80d9-f89af1da66a8.jpg",
        "creationDate": 1623007566000
      }
    ]
  }
]
```

but when the data is fetched in the database to be read, then the array of product is deserialized to build the following tree and sorted by `events -> dates -> meals -> products -> picture` . For example :

```javascript
Map {
  "Camp bleu " => Map {
    "06-06-2021" => Map {
      "Petit-déjeuner" => Array [
        Object {
          "date": "06-06-2021",
          "name": "Brioche",
          "photos": Array [
            Object {
              "creationDate": 1623007351000,
              "uri": "file:///storage/emulated/0/Pictures/Notlelo/0b9fb25e-c80a-4d5e-8e33-057a25f3769d.jpg",
            },
            Object {
              "creationDate": 1623007351000,
              "uri": "file:///storage/emulated/0/Pictures/Notlelo/799190a0-e03d-4952-85cd-6a6c6d0c24ab.jpg",
            },
          ],
          "uuid": "101b1b75-5861-4464-9d70-f6f3a193fe32",
        },
      ],
      "Déjeuner" => Array [
        Object {
          "date": "06-06-2021",
          "name": "Pâtes ",
          "photos": Array [
            Object {
              "creationDate": 1623007566000,
              "uri": "file:///storage/emulated/0/Pictures/Notlelo/b6603d08-5149-4b0e-80d9-f89af1da66a8.jpg",
            },
          ],
          "uuid": "f5475005-f53c-4407-b708-e5c33c16c420",
        },
      ],
    },
  },
}
```

## How to deploy on android

Increment the `android.versionCode` and `version` in the app.json
Run `expo build:android`, wait for the build to finish. Then download it on https://expo.io/.

Go to https://play.google.com/console/ and create an new release.

## Troubleshoot

`Error: ENOSPC: System limit for number of file watchers reached`

Close VS Code, then run `npm start` and reopen VS Code.

## Changelog

**_next release_**

- [x] investigate if any optimization is possible, like reducing taken pictures size, minify
- [x] FAQ section, to explain why the app is working like that: time take photo, share, iOS
- [x] add link to my mail for user to send me issues, and my signature
- [x] create a logo, and update the splah screen accordingly
- [x] write some documentation, about the data model
- [x] change the project name in notlelo
- [ ] add suggestion for product name input
- [ ] verify that the share is successful
- [ ] start to do some tests
- [ ] pimp the picture filler
- [ ] try another SGDF font
- [ ] build the app through EAS build when it will be in the free plan
- [ ] fix : reduce take picture button padding

**_v1.3_**

- add the date in the zip file architecture
- make the deletion of an event safer
- show a spinner while sharing the zip file
- display the app version on the home screen
- create global style file
- remove the loop of event in the library
- select the current event when coming back from the camera
- implement generic components : top bar, icon
- delete unnecessary buttons
- show a toast to give feedback to the user

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

source of icons : www.svgrepo.com  
draw the logo : www.youidraw.com  
generate the app icon : https://easyappicon.com/
