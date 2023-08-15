let songIndex = 0;
let tempIndex = -1;
let currentVolume;
// let audioElement = new Audio('songs/1.mp3');
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
            {songName: "Darkhaast", filepath: 'songs/Darkhaast Shivaay.mp3', coverPath: 'covers/Darkhaast.jpg', id: 1},
            {songName: "Kyon", filepath: 'songs/Kyon Barfi.mp3', coverPath: 'covers/Kyon.jpg', id: 2},
            {songName: "No Love", filepath: 'songs/No Love Shubh.mp3', coverPath: 'covers/No Love.jpg', id: 3},
            {songName: "Tere Hawaale", filepath: 'songs/Tere Hawaale Laal Singh Chaddha.mp3', coverPath: 'covers/Tere Hawale.jpg', id: 4},
            {songName: "Aye Khuda", filepath: 'songs/Aye Khuda - Murder 2.mp3', coverPath: 'covers/Aye Khuda.jpg', id: 5},
            {songName: "Cheques", filepath: 'songs/Cheques.mp3', coverPath: 'covers/Cheques.jpg', id: 6},
            {songName: "Kasoor", filepath: 'songs/Kasoor (Prateek Kuhad).mp3', coverPath: 'covers/Kasoor.jpg', id: 7},
            {songName: "Nadaan Parindey", filepath: 'songs/Nadaan Parindey Rockstar.mp3', coverPath: 'covers/Nadaan Parindey.jpg', id: 8},
            {songName: "Tere Naina", filepath: 'songs/Tere Naina.mp3', coverPath: 'covers/Tere Naina.jpg', id: 9},
            {songName: "Aaya Na Tu", filepath: 'songs/Aaya Na Tu.mp3', coverPath: 'covers/Aaya Na Tu.jpg', id: 10},
            {songName: "Bezubaan", filepath: 'songs/Bezubaan Kab Se Street Dancer.mp3', coverPath: 'covers/Bezubaan.jpg', id: 11},
            {songName: "Kaise Hua", filepath: 'songs/Kaise Hua - Kabir Singh.mp3', coverPath: 'covers/Kaise Hua.jpg', id: 12},
            {songName: "Mitwa", filepath: 'songs/Mitwa Kabhi Alvida Naa Kehna.mp3', coverPath: 'covers/Mitwa.jpg', id: 13},
            {songName: "Roobaroo", filepath: 'songs/Roobaroo - Rang De Basanti.mp3', coverPath: 'covers/Roobaroo.jpg', id: 14},
            {songName: "Banjaara", filepath: 'songs/Banjaara Ek Villain.mp3', coverPath: 'covers/Banjaara.jpg', id: 15},
            {songName: "Dildaara", filepath: 'songs/Dildaara Stand By Me Ra One.mp3', coverPath: 'covers/Dildaara.jpg', id: 16},
            {songName: "Left-Right", filepath: 'songs/Left Right Song Ali Sethi.mp3', coverPath: 'covers/LeftRight.jpg', id: 17},
            {songName: "Phir Mohabbat", filepath: 'songs/Phir Mohabbat - Murder 2.mp3', coverPath: 'covers/Phir Mohabbat.jpg', id: 18},
            {songName: "Bekhayali", filepath: 'songs/Bekhayali - Kabir Singh.mp3', coverPath: 'covers/Bekhayali.jpg', id: 19},
            {songName: "Beete Lamhein", filepath: 'songs/Beete Lamhein The Train.mp3', coverPath: 'covers/Beete Lamhein.jpg', id: 20},
            {songName: "Gul", filepath: 'songs/Gul.mp3', coverPath: 'covers/Gul.jpg', id: 21},
            {songName: "Mann Mera", filepath: 'songs/Mann Mera - Table No. 21.mp3', coverPath: 'covers/Mann Mera.jpg', id: 21},
            {songName: "Ranjha", filepath: 'songs/Ranjha - Shershaah.mp3', coverPath: 'covers/Ranjha.jpg', id: 21},
            {songName: "Zaroorat", filepath: 'songs/Zaroorat.mp3', coverPath: 'covers/Zaroorat.jpg', id: 21}
        ],
    },
};

let currentLibraryKey = "Home";
library = libraries[currentLibraryKey];
let audioElement = new Audio(libraries[currentLibraryKey].songs[0].filepath);

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
    // myProgressBar.value = 0;
    // audioElement.duration = 0;
    // audioElement = new Audio(libraries[currentLibraryKey].songs[0].filepath);
    playlists = Array.from(document.getElementsByClassName('liked'));
    songItem = Array.from(document.getElementsByClassName('cards'));
    masterPlayCover = Array.from(document.getElementsByClassName('masterPlayCover'));
    songCard = Array.from(document.getElementsByClassName('cards'));
    // audioElement.currentTime = 0;
    
    // masterPlay.classList.remove('fa-pause-circle');
    // masterPlay.classList.add('fa-play-circle');
    // masterPlayCover[songIndex].classList.add("fa-play-circle");
    // masterPlayCover[songIndex].classList.remove("fa-pause-circle");
    // masterPlayCover[songIndex].classList.add('playVisible');
    // masterPlayCover[songIndex].classList.add('colorRed');

    initializePlayCover();
}

/***************************DOM SECTION END *********************************/ 


/***************************CONTROL SECTION JAVASCRIPT*****************************/ 
masterPlay.addEventListener('click',()=>{
    tempIndex = songIndex;
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
        if(songIndex > songItem.length - 1) {
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
        songIndex = songItem.length - 1;
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
    console.log(libraries[currentLibraryKey].songs[songIndex]);
    addToLiked(songIndex);
})

function addToLiked(songIndex){
    const song = libraries.Home.songs[songIndex];
    if(!libraries['Liked Songs'].songs.includes(song)) {
        libraries['Liked Songs'].songs.push(song);
        saveLibraries();
        saveLibrarySongs("Liked Songs");
    }
}

function addToLibrary(songIndex) {
    const song = libraries.home.songs[songIndex];
    if(!libraries[currentLibraryKey].songs.includes(song)) {
        libraries[currentLibraryKey].songs.push(song);
        saveLibraries();
        saveLibrarySongs(currentLibraryKey);
        // displayLibrarySongs(currentLibraryKey);
    }
}

function switchLibrary (libraryKey) {
    // audioElement.pause();
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
    let initialLibrary = currentLibraryKey;
    let changedLibrary = currentLibraryKey;

audioElement.addEventListener('timeupdate',()=>{
changedLibrary = currentLibraryKey;
// if(changedLibrary != initialLibrary) {
//     myProgressBar.value = 0;
//     initialLibrary = changedLibrary;
// } else {
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
// }

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


