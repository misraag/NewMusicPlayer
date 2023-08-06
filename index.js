let songIndex = 0;
let tempIndex = -1;
let currentVolume;
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
let volumeIcon = document.getElementById('volumeLogo');
// let playVisible = Array.from(document.getElementsByClassName('playVisible'));
let songCard = Array.from(document.getElementsByClassName('cards'));
let playIcon = Array.from(document.getElementsByClassName('play-icon'));
let playNext = document.getElementById('next');
let playPrev = document.getElementById('previous');

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

function getDuration(src) {
    return new Promise(function(resolve) {
        var audio = new Audio();
        $(audio).on("loadedmetadata", function(){
            let durationMins = parseInt(audio.duration / 60);
            let durationSecs = parseInt(audio.duration % 60);
            if (durationSecs<10) {
                resolve(`0${durationMins}:0${durationSecs}`);
            } else {
               resolve(`0${durationMins}:${durationSecs}`); 
            }
        });
        audio.src = src;
    });
}

songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("music-name")[0].innerText = songs[i].songName;
    getDuration(songs[i].filepath).then(function(length) {
    element.getElementsByClassName("duration")[0].textContent = length;
    });

})

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.volume = myVolumeBar.value / 100;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        if(songIndex == 0) {
            masterPlayCover[songIndex].classList.add("fa-pause-circle");
            masterPlayCover[songIndex].classList.remove("fa-play-circle");
            masterPlayCover[songIndex].classList.remove('playVisible');
            masterPlayCover[songIndex].classList.add('colorRed');
            masterSongName.innerText = songs[songIndex].songName;
            coverSongName.innerText = songs[songIndex].songName;
            footCoverImage.src = songs[songIndex].coverPath;
            playingCoverImage.src = songs[songIndex].coverPath;
            // audioElement.volume = myVolumeBar.value / 100;
        } else {
            masterPlayCover[songIndex-1].classList.add("fa-pause-circle");
            masterPlayCover[songIndex-1].classList.remove("fa-play-circle");
            masterPlayCover[songIndex-1].classList.remove('playVisible');
            masterPlayCover[songIndex-1].classList.add('colorRed');
            masterSongName.innerText = songs[songIndex-1].songName;
            coverSongName.innerText = songs[songIndex-1].songName;
            footCoverImage.src = songs[songIndex-1].coverPath;
            playingCoverImage.src = songs[songIndex-1].coverPath;
        }

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        if(songIndex == 0) {
            masterPlayCover[songIndex].classList.add("fa-play-circle");
            masterPlayCover[songIndex].classList.remove("fa-pause-circle");
            masterPlayCover[songIndex].classList.add('playVisible');
            masterPlayCover[songIndex].classList.remove('colorRed');
        } else {
            masterPlayCover[songIndex-1].classList.add("fa-play-circle");
            masterPlayCover[songIndex-1].classList.remove("fa-pause-circle");
            masterPlayCover[songIndex-1].classList.add('playVisible');
            masterPlayCover[songIndex-1].classList.remove('colorRed');
        }
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


function makeAllPlay () {
    masterPlayCover.forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
        element.classList.add('playVisible');
        element.classList.remove('colorRed');
    })
}


masterPlayCover.forEach((element) => {
    element.addEventListener('click', (e) => {
        audioElement.volume = myVolumeBar.value / 100;
        songIndex = parseInt(e.target.id);
        if(tempIndex == songIndex && e.target.classList.contains("fa-play-circle")) {
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            e.target.classList.remove('playVisible');
            e.target.classList.add('colorRed');
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            masterSongName.innerText = songs[songIndex-1].songName;
            coverSongName.innerText = songs[songIndex-1].songName;
            footCoverImage.src = songs[songIndex-1].coverPath;
            playingCoverImage.src = songs[songIndex-1].coverPath;
            audioElement.play();
            currentVolume = audioElement.volume;
        } else if (e.target.classList.contains("fa-play-circle")) {
            tempIndex = songIndex;
            if(songIndex%10 == 0) {
                songIndex = 10;
            } else {
                songIndex = songIndex%10;
            }
            audioElement.src = `songs/${songIndex}.mp3`;
            makeAllPlay();
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-pause-circle");
            e.target.classList.remove('playVisible');
            e.target.classList.add('colorRed');
            masterPlay.classList.remove("fa-play-circle");
            masterPlay.classList.add("fa-pause-circle");
            masterSongName.innerText = songs[tempIndex-1].songName;
            coverSongName.innerText = songs[tempIndex-1].songName;
            footCoverImage.src = songs[songIndex-1].coverPath;
            playingCoverImage.src = songs[songIndex-1].coverPath;
            audioElement.currentTime = 0;
            audioElement.play();
            currentVolume = audioElement.volume;
        } else {
            e.target.classList.remove("fa-pause-circle");
            audioElement.pause();
            e.target.classList.add("fa-play-circle");
            masterPlay.classList.remove("fa-pause-circle");
            masterPlay.classList.add("fa-play-circle");
            e.target.classList.add('playVisible');
            e.target.classList.remove('colorRed');
        }
    })
})

playNext.addEventListener('click', ()=> {
    songIndex = songIndex + 1;

})



volumeIcon.addEventListener("click", () => {
    let currVol = myVolumeBar.value / 100;
    if(!volumeIcon.classList.contains("fa-volume-xmark")) {
        volumeIcon.classList.remove("fa-volume-high");
        volumeIcon.classList.remove("fa-volume-low");
        volumeIcon.classList.add("fa-volume-xmark");
        audioElement.volume = 0;
    } else {
        volumeIcon.classList.remove("fa-volume-xmark");
        if(currVol >= 0.3) {
            volumeIcon.classList.add("fa-volume-high");
            volumeIcon.classList.remove("fa-volume-low");
        } else {
            volumeIcon.classList.add("fa-volume-low");
            volumeIcon.classList.remove("fa-volume-high");
        }
        audioElement.volume = currVol;
    }
    
})

function setVolume(){
    audioElement.volume = myVolumeBar.value / 100;
    
    if(audioElement.volume == 0) {
        volumeIcon.classList.remove("fa-volume-high");
        volumeIcon.classList.remove("fa-volume-low");
        volumeIcon.classList.add("fa-volume-xmark");
    } else {
        if(audioElement.volume >= 0.3) {
            volumeIcon.classList.add("fa-volume-high");
            volumeIcon.classList.remove("fa-volume-low");
            volumeIcon.classList.remove("fa-volume-xmark");
        } else {
            volumeIcon.classList.add("fa-volume-low");
            volumeIcon.classList.remove("fa-volume-high");
            volumeIcon.classList.remove("fa-volume-xmark");
        }
    }
}