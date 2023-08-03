let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let songItem = Array.from(document.getElementsByClassName('cards'));
let masterPlay = document.getElementById('masterPlay');
let masterPlayCover = Array.from(document.getElementsByClassName('masterPlayCover'));
let masterSongName = document.getElementById('masterSongName');
let coverSongName = document.getElementById('coversongname');
let footCoverImage = document.getElementById('footercoverimg');
let playingCoverImage = document.getElementById('playing-cover-img');
let timerStart = document.getElementById('timerstart');
let timerEnd = document.getElementById('timerend');

let songCard = Array.from(document.getElementsByClassName('cards'));
let playIcon = Array.from(document.getElementsByClassName('play-icon'));


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
    {songName: "Song 10", filepath: 'songs/10.mp3', coverPath: 'covers/10.jpg'},
    {songName: "Song 11", filepath: 'songs/1.mp3', coverPath: 'covers/1.jpg'},
    {songName: "Song 12", filepath: 'songs/2.mp3', coverPath: 'covers/2.jpg'},
    {songName: "Song 13", filepath: 'songs/3.mp3', coverPath: 'covers/3.jpg'},
    {songName: "Song 14", filepath: 'songs/4.mp3', coverPath: 'covers/4.jpg'},
    {songName: "Song 15", filepath: 'songs/5.mp3', coverPath: 'covers/5.jpg'},
    {songName: "Song 16", filepath: 'songs/6.mp3', coverPath: 'covers/6.jpg'},
    {songName: "Song 17", filepath: 'songs/7.mp3', coverPath: 'covers/7.jpg'},
    {songName: "Song 18", filepath: 'songs/8.mp3', coverPath: 'covers/8.jpg'},
    {songName: "Song 19", filepath: 'songs/9.mp3', coverPath: 'covers/9.jpg'},
    {songName: "Song 20", filepath: 'songs/10.mp3', coverPath: 'covers/10.jpg'},
    {songName: "Song 21", filepath: 'songs/1.mp3', coverPath: 'covers/1.jpg'}
]

songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("music-name")[0].innerText = songs[i].songName;
    let songElement = new Audio(`'${songs[i].filepath}'`);
})

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        coverSongName.innerText = songs[songIndex].songName;
        footCoverImage.src = songs[songIndex].coverPath;
        playingCoverImage.src = songs[songIndex].coverPath;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        masterPlayCover[songIndex].classList.remove("fa-play-circle");
        masterPlayCover[songIndex].classList.add("fa-pause-circle");

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        masterPlayCover[songIndex].classList.add("fa-play-circle");
        masterPlayCover[songIndex].classList.remove("fa-pause-circle");
    }
    
    })
    
    function time(){
        minsStart = parseInt((audioElement.currentTime)/60);
        secondsStart = parseInt((audioElement.currentTime)-(60*minsStart));
        minsEnd = parseInt((audioElement.duration - audioElement.currentTime)/60);
        secondsEnd = parseInt((audioElement.duration - audioElement.currentTime) % 60);
        if(audioElement.currentTime>59){
            if (secondsStart<10) {
                timerStart.innerText = `0${minsStart}:0${secondsStart}`;
            } else {
               timerStart.innerText = `0${minsStart}:${secondsStart}`; 
            }

            if (secondsEnd<10) {
                timerEnd.innerText = `0${minsEnd}:0${secondsEnd}`;
            } else {
               timerEnd.innerText = `0${minsEnd}:${secondsEnd}`; 
            }
        }
        else{
            if (secondsStart<10) {
                timerStart.innerText = `0${minsStart}:0${secondsStart}`;
            } else {
               timerStart.innerText = `0${minsStart}:${secondsStart}`; 
            }

            if (secondsEnd<10) {
                timerEnd.innerText = `0${minsEnd}:0${secondsEnd}`;
            } else {
               timerEnd.innerText = `0${minsEnd}:${secondsEnd}`; 
            }
            
        }
        
    }
    
    audioElement.addEventListener('timeupdate',()=>{
        let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
        myProgressBar.value = progress;
        time();
    })
    
    myProgressBar.addEventListener('change', ()=>{
        audioElement.currentTime = ((myProgressBar.value)*(audioElement.duration))/100;
        time();
    })

    // masterPlayCover.forEach((element)=> {
    //     element.addEventListener('click', (e)=>{
    //         songIndex = parseInt(e.target.id);
    //         if(e.target.classList.contains("fa-pause-circle")) {
    //             audioElement.pause();
    //             e.target.classList.remove("fa-pause-circle");
    //             e.target.classList.add("fa-play-circle");
    //             masterPlay.classList.remove("fa-pause-circle");
    //             masterPlay.classList.add("fa-play-circle");
    //         } else if () {

    //         }
    //      })
    // })