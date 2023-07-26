let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let songItem = Array.from(document.getElementsByClassName('cardcontent'));
let masterPlay = document.getElementById('masterPlay');
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Song 1", filepath: 'songs/1.mp3', coverPath: 'covers/1.jpg'},
    {songName: "Song 2", filepath: 'songs/2.mp3', coverPath: 'covers/2.jpg'},
    {songName: "Song 3", filepath: 'songs/3.mp3', coverPath: 'covers/3.jpg'},
    {songName: "Song 4", filepath: 'songs/4.mp3', coverPath: 'covers/4.jpg'},
    {songName: "Song 5", filepath: 'songs/5.mp3', coverPath: 'covers/5.jpg'},
    {songName: "Song 6", filepath: 'songs/6.mp3', coverPath: 'covers/6.jpg'},
    {songName: "Song 7", filepath: 'songs/7.mp3', coverPath: 'covers/7.jpg'},
    {songName: "Song 8", filepath: 'songs/8.mp3', coverPath: 'covers/8.jpg'},
    {songName: "Song 9", filepath: 'songs/9.mp3', coverPath: 'covers/9.jpg'},
    {songName: "Song 10", filepath: 'songs/10.mp3', coverPath: 'covers/10.jpg'}
]



masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        // gif.style.opacity =1;
        // playButton[songIndex].classList.remove("fa-play-circle");
        // playButton[songIndex].classList.add("fa-pause-circle");
        songItem[songIndex].classList.add('afterSelect');
        
        
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        // gif.style.opacity =0;
        makeAllPlays();
        songItem[songIndex].classList.remove('afterSelect');
    }
})