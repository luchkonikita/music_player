# Music player for VK.com

Current functionality includes:

* Retrieving user's audios
* Searching for songs from another user's audios
* Adding a song to user audios
* Downloading a song which is playing now
* to be continued...

##### Approximate state structure used in application:

```javascript
{
  userData: {
    access_token: 'token',
    expires_in: '86400',
    user_id: 1
  },
  currentSong: {
    artist: 'Artist',
    title: 'Title',
    currentTime: 213,
    duration: 310,
    isPlaying: true,
    progress: 80
  },
  songsList: [
    {
      title: 'Title',
      artist: 'Artist',
      isOwn: true,
      isAdded: false
    }
  ]
}
```
