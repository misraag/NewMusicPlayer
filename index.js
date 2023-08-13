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
let songCard = Array.from(document.getElementsByClassName('cards'));
let playIcon = Array.from(document.getElementsByClassName('play-icon'));
let playNext = document.getElementById('next');
let playPrev = document.getElementById('previous');
let searchBar = document.getElementById('searchbar');
let mySpan = document.getElementById('searchbarname');
let searchfilter = document.getElementById('search');
let songDiv = document.getElementById('songdiv');
let homeButton = document.getElementById('homeButton');
/**************/
let navBarButtons = Array.from(document.getElementsByClassName('navbar-button'));
let createPlaylist = document.getElementById('createPlaylist');

let playlists = Array.from(document.getElementsByClassName('liked'));
let alertClose = document.getElementById('alertClose');
let alertBox = document.getElementById('alertBox');
let acceptName = document.getElementById('acceptName');
let inputClassName = document.getElementById('inputClassName');
let heartIcon = document.getElementById('heart');

let library;

const libraries = JSON.parse(localStorage.getItem('libraries')) || { 
    "Liked Songs": {
        title: "Liked Songs",
        songs: JSON.parse(localStorage.getItem("Liked Songs")) || []
    },

    "Home": {
        title: "Home",
        songs: JSON.parse(localStorage.getItem("Home")) || [
            {songName: "Song 1", filepath: 'songs/1.mp3', coverPath: 'covers/1.jpg', id: 1},
            {songName: "Song 2", filepath: 'songs/2.mp3', coverPath: 'covers/2.jpg', id: 2},
            {songName: "Song 3", filepath: 'songs/3.mp3', coverPath: 'covers/3.jpg', id: 3},
            {songName: "Song 4", filepath: 'songs/4.mp3', coverPath: 'covers/4.jpg', id: 4},
            {songName: "Song 5", filepath: 'songs/5.mp3', coverPath: 'covers/5.jpg', id: 5},
            {songName: "Song 6", filepath: 'songs/6.mp3', coverPath: 'covers/6.jpg', id: 6},
            {songName: "Song 7", filepath: 'songs/7.mp3', coverPath: 'covers/7.jpg', id: 7},
            {songName: "Song 8", filepath: 'songs/8.mp3', coverPath: 'covers/8.jpg', id: 8},
            {songName: "Song 9", filepath: 'songs/9.mp3', coverPath: 'covers/9.jpg', id: 9},
            {songName: "Song 10", filepath: 'songs/10.mp3', coverPath: 'covers/10.jpg', id: 10},
            {songName: "Song 11", filepath: 'songs/11.mp3', coverPath: 'covers/11.jpg', id: 11},
            {songName: "Song 12", filepath: 'songs/12.mp3', coverPath: 'covers/12.jpg', id: 12},
            {songName: "Song 13", filepath: 'songs/13.mp3', coverPath: 'covers/13.jpg', id: 13},
            {songName: "Song 14", filepath: 'songs/14.mp3', coverPath: 'covers/14.jpg', id: 14},
            {songName: "Song 15", filepath: 'songs/15.mp3', coverPath: 'covers/15.jpg', id: 15},
            {songName: "Song 16", filepath: 'songs/16.mp3', coverPath: 'covers/16.jpg', id: 16},
            {songName: "Song 17", filepath: 'songs/17.mp3', coverPath: 'covers/17.jpg', id: 17},
            {songName: "Song 18", filepath: 'songs/18.mp3', coverPath: 'covers/18.jpg', id: 18},
            {songName: "Song 19", filepath: 'songs/19.mp3', coverPath: 'covers/19.jpg', id: 19},
            {songName: "Song 20", filepath: 'songs/20.mp3', coverPath: 'covers/20.jpg', id: 20},
            {songName: "Song 21", filepath: 'songs/21.mp3', coverPath: 'covers/21.jpg', id: 21}
        ],
    },
};

let currentLibraryKey = "Home";
displayLibraryList();
displaySongs(currentLibraryKey);

/******************************DOM ELEMENT**************************/ 

function displayLibraryList() {
    const libraryList = document.getElementById("library-list");
    libraryList.innerHTML = "";

    for (const libraryKey in libraries) {
        const div = document.createElement("div");
        div.textContent = libraries[libraryKey].title;
        div.classList.add('liked');
        libraryList.appendChild(div);
    }
}

function displaySongs (libraryKey) {
    document.getElementById('rowdiv').innerHTML = "";
    library = libraries[libraryKey];
    var indexNo = 0;
    library.songs.forEach((song) => {
        var cardDiv = document.createElement('div');
        cardDiv.classList.add('col-lg-2', 'col-md-4', 'col-sm-6', 'col-xs-12',  'cards', 'h-100');
        var playCover = document.createElement('i');
        playCover.classList.add('fas', 'fa-3x', 'fa-play-circle', 'masterPlayCover', 'playVisible');
        playCover.id = indexNo;
        indexNo++;
        var imageCover = document.createElement('img');
        imageCover.classList.add('card-img-top');
        imageCover.src = song.coverPath;
        var songInfo = document.createElement('div');
        songInfo.classList.add('song-info');
        var musicName = document.createElement('div');
        musicName.classList.add('music-name');
        musicName.innerText = song.songName;
        var duration = document.createElement('div');
        duration.classList.add('duration');
        getDuration(song.filepath).then(function(length) {
        duration.innerText = length;    
        }); 
        songInfo.appendChild(musicName);
        songInfo.appendChild(duration);
        cardDiv.appendChild(playCover);
        cardDiv.appendChild(imageCover);
        cardDiv.appendChild(songInfo);
        document.getElementById('rowdiv').appendChild(cardDiv);
    })
    initializeMusicPlayer();
}

function initializeMusicPlayer() {
    songIndex = 0;
    tempIndex = -1;
    audioElement = new Audio(libraries[currentLibraryKey].songs[0].filepath);
    playlists = Array.from(document.getElementsByClassName('liked'));
    songItem = Array.from(document.getElementsByClassName('cards'));
    masterPlayCover = Array.from(document.getElementsByClassName('masterPlayCover'));
    songCard = Array.from(document.getElementsByClassName('cards'));
    initializePlayCover();
}

/***************************DOM SECTION END *********************************/ 


/***************************CONTROL SECTION JAVASCRIPT*****************************/ 
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.volume = myVolumeBar.value / 100;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        masterPlayCover[songIndex].classList.add("fa-pause-circle");
        masterPlayCover[songIndex].classList.remove("fa-play-circle");
        masterPlayCover[songIndex].classList.remove('playVisible');
        masterPlayCover[songIndex].classList.add('colorRed');
        masterSongName.innerText = library.songs[songIndex].songName;
        coverSongName.innerText = library.songs[songIndex].songName;
        footCoverImage.src = library.songs[songIndex].coverPath;
        playingCoverImage.src = library.songs[songIndex].coverPath;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
            masterPlayCover[songIndex].classList.add("fa-play-circle");
            masterPlayCover[songIndex].classList.remove("fa-pause-circle");
            masterPlayCover[songIndex].classList.add('playVisible');
            masterPlayCover[songIndex].classList.remove('colorRed');
    }
})


function initializePlayCover() {
    masterPlayCover.forEach((element) => {
        element.addEventListener('click', (e) => {
            audioElement.volume = myVolumeBar.value / 100;       
            songIndex = parseInt(e.target.id);

            if(e.target.classList.contains("fa-play-circle")) { 
                if(tempIndex != songIndex) {
                    tempIndex = songIndex;
                    audioElement.src = library.songs[songIndex].filepath;
                    makeAllPlay();
                    audioElement.currentTime = 0;
                }
                audioElement.play();
                currentVolume = audioElement.volume;
                e.target.classList.remove("fa-play-circle");
                e.target.classList.add("fa-pause-circle");
                e.target.classList.remove('playVisible');
                e.target.classList.add('colorRed');
                masterPlay.classList.remove("fa-play-circle");
                masterPlay.classList.add("fa-pause-circle");
                masterSongName.innerText = library.songs[songIndex].songName;
                coverSongName.innerText = library.songs[songIndex].songName;
                footCoverImage.src = library.songs[songIndex].coverPath;
                playingCoverImage.src = library.songs[songIndex].coverPath;
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
}

playNext.addEventListener('click', ()=> {
    audioElement.volume = myVolumeBar.value / 100;
        songIndex = tempIndex + 1;
        if(songIndex > 20) {
            songIndex = 0;
        }
        console.log(songIndex);
        tempIndex = songIndex;
        audioElement.src = library.songs[songIndex].filepath;
        makeAllPlay();
        masterPlayCover[songIndex].classList.add("fa-pause-circle");
        masterPlayCover[songIndex].classList.remove("fa-play-circle");
        masterPlayCover[songIndex].classList.remove('playVisible');
        masterPlayCover[songIndex].classList.add('colorRed');
        masterSongName.innerText = library.songs[songIndex].songName;
        coverSongName.innerText = library.songs[songIndex].songName;
        footCoverImage.src = library.songs[songIndex].coverPath;
        playingCoverImage.src = library.songs[songIndex].coverPath;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        playingCoverImage.src = library.songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        currentVolume = audioElement.volume;
})

playPrev.addEventListener('click', ()=> {
    audioElement.volume = myVolumeBar.value / 100;
    songIndex = tempIndex - 1;
    if(songIndex < 0) {
        songIndex = 20;
    }
    tempIndex = songIndex;
    audioElement.src = library.songs[songIndex].filepath;
    makeAllPlay();
    masterPlayCover[songIndex].classList.remove("fa-play-circle");
    masterPlayCover[songIndex].classList.add("fa-pause-circle");
    masterPlayCover[songIndex].classList.remove('playVisible');
    masterPlayCover[songIndex].classList.add('colorRed');
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    masterSongName.innerText = library.songs[songIndex].songName;
    coverSongName.innerText = library.songs[songIndex].songName;
    footCoverImage.src = library.songs[songIndex].coverPath;
    playingCoverImage.src = library.songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    currentVolume = audioElement.volume;   
})

/***********************************END OF CONTROL SECTION******************************/ 

/*******************DOM FUNCTIONALITIES CLICK EVENTS************************/ 

function saveLibraries() {
    localStorage.setItem("libraries", JSON.stringify(libraries));
}

function saveLibrarySongs (libraryKey) {
    localStorage.setItem(libraryKey, JSON.stringify(libraries[libraryKey].songs));
}

createPlaylist.addEventListener('click', () => {
    newPlaylist();
});

function newPlaylist() {
    alertClose.classList.remove('hideAlerts');
    alertBox.classList.remove('hideAlerts');
    alertClose.classList.add('displayAlerts');
    alertBox.classList.add('displayAlerts');
}

alertClose.addEventListener('click', () => {
    alertClose.classList.add('hideAlerts');
    alertBox.classList.add('hideAlerts');
    alertClose.classList.remove('displayAlerts');
    alertBox.classList.remove('displayAlerts');
})

acceptName.addEventListener('click', () => {
    var playlistName = inputClassName.value;
    alertClose.classList.add('hideAlerts');
    alertBox.classList.add('hideAlerts');
    alertClose.classList.remove('displayAlerts');
    alertBox.classList.remove('displayAlerts');
    createLibrary(playlistName);
})

function createLibrary (libraryName) {
    const newLibraryKey = libraryName;
        libraries[newLibraryKey] = {
            title: libraryName,
            songs: [],
        }
        saveLibraries();
        saveLibrarySongs(newLibraryKey);
        displayLibraryList();
}

heartIcon.addEventListener('click', () => {
    console.log("clicked on heartbeat");
    console.log(libraries[currentLibraryKey].songs[songIndex - 1]);
    addToLiked(songIndex);
})

function addToLiked(songIndex){
    const song = libraries.Home.songs[songIndex-1];
    if(!libraries['Liked Songs'].songs.includes(song)) {
        libraries['Liked Songs'].songs.push(song);
        saveLibrarySongs("Liked Songs");
    }
}

function addToLibrary(songIndex) {
    const song = libraries.home.songs[songIndex];
    if(!libraries[currentLibraryKey].songs.includes(song)) {
        libraries[currentLibraryKey].songs.push(song);
        saveLibrarySongs(currentLibraryKey);
        // displayLibrarySongs(currentLibraryKey);
    }
}

function switchLibrary (libraryKey) {
    currentLibraryKey = libraryKey;
    displaySongs(currentLibraryKey);
}

playlists.forEach((playlist) => {
    playlist.addEventListener('click', (e) => {
        switchLibrary(e.target.textContent);
        removeAllClickedPlaylist();
        e.target.classList.add('playlist-clicked');
    })
})

function removeAllClickedPlaylist() {
    playlists.forEach((playlist) => {
            playlist.classList.remove('playlist-clicked');
        })
} 

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
    
function makeAllPlay () {
    masterPlayCover.forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
        element.classList.add('playVisible');
        element.classList.remove('colorRed');
    })
}
/*******************DOM FUNCTIONALITIES END *************************/ 

/*************************TIME DURATION FUNCTION********************/ 

    
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

volumeIcon.addEventListener("click", () => {
    let currVol = myVolumeBar.value / 100;
    if(!volumeIcon.classList.contains("fa-volume-xmark")) {
        volumeIcon.classList.remove("fa-volume-high");
        volumeIcon.classList.remove("fa-volume-low");
        volumeIcon.classList.add("fa-volume-xmark");
        volumeIcon.classList.add("volumeiconmuted");
        audioElement.volume = 0;
    } else {
        volumeIcon.classList.remove("volumeiconmuted");
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


/*********************NAVBAR FUNCTIONALITIES***************************/ 

function checkClickOutside(event) {
    if (!searchBar.contains(event.target) && searchfilter.value == "") {
        mySpan.classList.remove("hidesearchspan");
        document.getElementById("searchbaricon").classList.remove("searchbariconright");
        document.getElementById("searchbaricon").classList.remove("button-clicked");
        document.getElementById("search").classList.add("hidesearchbar");
    }
}

searchBar.addEventListener("click", () =>{
    mySpan.classList.add("hidesearchspan");
    document.getElementById("searchbaricon").classList.add("searchbariconright");
    document.getElementById("searchbaricon").classList.add("button-clicked");
    document.getElementById("search").classList.remove("hidesearchbar");
})

document.addEventListener('click', checkClickOutside);

function searchFunction() {
    let filter = searchfilter.value.toUpperCase();
    let songInfo = Array.from(document.getElementsByClassName('song-info'));
    songInfo.forEach((element) => {
        let songNameSearch = element.getElementsByTagName('div')[0].textContent.toUpperCase();
        if(songNameSearch.indexOf(filter) > -1) {
            element.parentElement.style.display = '';
        } else {
            element.parentElement.style.display = "none";
        }
    })  
}

homeButton.addEventListener('click', () => {
    homeButton.classList.add('button-clicked');
    document.getElementById('homeButtonName').classList.add('button-clicked');
    document.getElementById('homeIcon').classList.add('button-clicked');
    searchfilter.value = "";
    searchFunction();
})


