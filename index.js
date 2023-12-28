let songIndex = 0;
let tempIndex = -1;
let currentVolume;
let songItem = Array.from(document.getElementsByClassName('cards'));
let masterPlay = document.getElementById('masterPlay');
let masterPlayMobile = document.getElementById('masterPlayMobile');
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
// let playlists = Array.from(document.getElementsByClassName('library-div'));

let alertClose = document.getElementById('alertClose');
let alertBox = document.getElementById('alertBox');
let librarylistpopup = document.getElementById('librarylistpopup');
let acceptName = document.getElementById('acceptName');
let inputClassName = document.getElementById('inputClassName');
let heartIcon = document.getElementById('heart');
let repeatIcon = document.getElementById('repeaticon');
let hearts = Array.from(document.getElementsByClassName('fa-heart'));
let booksicon = Array.from(document.getElementsByClassName('fa-book-medical'));
let deleticons;
let librariespopups;
let flagRepeat = false;
let library;
let deleteButtons;


let searchMobileDiv = document.getElementById('mobile-firstsection');
let searchMobile = document.getElementById('searchmobile');
let searchBarMobile = document.getElementById('searchbarmobile');
let searchMobileIcon = document.getElementById('searchbariconmobile');
let playingMobileSongDiv = document.getElementById('playingsongmobilediv');

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
            // {songName: "No Love", filepath: 'songs/No Love Shubh.mp3', coverPath: 'covers/No Love.jpg', id: 3},
            {songName: "Tere Hawaale", filepath: 'songs/Tere Hawaale Laal Singh Chaddha.mp3', coverPath: 'covers/Tere Hawale.jpg', id: 3},
            {songName: "Aye Khuda", filepath: 'songs/Aye Khuda - Murder 2.mp3', coverPath: 'covers/Aye Khuda.jpg', id: 4},
            // {songName: "Cheques", filepath: 'songs/Cheques.mp3', coverPath: 'covers/Cheques.jpg', id: 6},
            {songName: "Kasoor", filepath: 'songs/Kasoor (Prateek Kuhad).mp3', coverPath: 'covers/Kasoor.jpg', id: 5},
            {songName: "Nadaan Parindey", filepath: 'songs/Nadaan Parindey Rockstar.mp3', coverPath: 'covers/Nadaan Parindey.jpg', id: 6},
            {songName: "Tere Naina", filepath: 'songs/Tere Naina.mp3', coverPath: 'covers/Tere Naina.jpg', id: 7},
            {songName: "Aaya Na Tu", filepath: 'songs/Aaya Na Tu.mp3', coverPath: 'covers/Aaya Na Tu.jpg', id: 8},
            {songName: "Bezubaan", filepath: 'songs/Bezubaan Kab Se Street Dancer.mp3', coverPath: 'covers/Bezubaan.jpg', id: 9},
            {songName: "Kaise Hua", filepath: 'songs/Kaise Hua - Kabir Singh.mp3', coverPath: 'covers/Kaise Hua.jpg', id: 10},
            {songName: "Mitwa", filepath: 'songs/Mitwa Kabhi Alvida Naa Kehna.mp3', coverPath: 'covers/Mitwa.jpg', id: 11},
            {songName: "Roobaroo", filepath: 'songs/Roobaroo - Rang De Basanti.mp3', coverPath: 'covers/Roobaroo.jpg', id: 12},
            {songName: "Banjaara", filepath: 'songs/Banjaara Ek Villain.mp3', coverPath: 'covers/Banjaara.jpg', id: 13},
            {songName: "Dildaara", filepath: 'songs/Dildaara Stand By Me Ra One.mp3', coverPath: 'covers/Dildaara.jpg', id: 14},
            {songName: "Left-Right", filepath: 'songs/Left Right Song Ali Sethi.mp3', coverPath: 'covers/LeftRight.jpg', id: 15},
            {songName: "Phir Mohabbat", filepath: 'songs/Phir Mohabbat - Murder 2.mp3', coverPath: 'covers/Phir Mohabbat.jpg', id: 16},
            {songName: "Bekhayali", filepath: 'songs/Bekhayali - Kabir Singh.mp3', coverPath: 'covers/Bekhayali.jpg', id: 17},
            {songName: "Beete Lamhein", filepath: 'songs/Beete Lamhein The Train.mp3', coverPath: 'covers/Beete Lamhein.jpg', id: 18},
            {songName: "Gul", filepath: 'songs/Gul.mp3', coverPath: 'covers/Gul.jpg', id: 19},
            {songName: "Mann Mera", filepath: 'songs/Mann Mera - Table No. 21.mp3', coverPath: 'covers/Mann Mera.jpg', id: 20},
            {songName: "Ranjha", filepath: 'songs/Ranjha - Shershaah.mp3', coverPath: 'covers/Ranjha.jpg', id: 21},
            {songName: "Zaroorat", filepath: 'songs/Zaroorat.mp3', coverPath: 'covers/Zaroorat.jpg', id: 22}
        ],
    },
};

let currentLibraryKey = "Home";
let audioElement = new Audio(libraries[currentLibraryKey].songs[0].filepath);

displayLibraryList();

displaySongs(currentLibraryKey);

/******************************DISPLAY LIBRARIES AND POPUPS**************************/ 

function displayLibraryList() {
    saveLibraries();
    let libraryList = document.getElementById("library-list");
    libraryList.innerHTML = "";
    var librariesList = JSON.parse(localStorage.getItem("libraries")) || libraries;
    
    for (const libraryKey in librariesList) {
        if(!(libraryKey == "Home")) {
            const div = document.createElement("div");
            div.classList.add("library-div");
            const span = document.createElement('span');
            span.textContent = librariesList[libraryKey].title;
            span.classList.add('liked');
            div.appendChild(span);
            if(!(libraryKey == "Liked Songs")) {
                const icon = document.createElement('i');
                icon.classList.add("fa-solid", "fa-ellipsis");
                div.appendChild(icon);
                const divdelete = document.createElement('div');
                divdelete.textContent = "Delete";
                divdelete.classList.add('divdelete', 'hideDiv');
                div.appendChild(divdelete);
            }
            libraryList.appendChild(div);
        }
    }
    deleteButtons = Array.from(document.getElementsByClassName('divdelete'));
    playlists = Array.from(document.getElementsByClassName('liked'));
    initializeDeleteButtons()
    initializePlaylistLibrary();

    console.log(playlists);
    deleticons = Array.from(document.getElementsByClassName('fa-ellipsis'));
    initializeDeleteIcons();
    populatelibrarylistpopup();
}

function populatelibrarylistpopup() {
    const popupLibraryList = document.getElementById("librarylistpopup");
    popupLibraryList.innerHTML = "";
    var librariesList = JSON.parse(localStorage.getItem("libraries")) || libraries;
    let textdiv = document.createElement('div');
    textdiv.classList.add('textMsgName');
    textdiv.textContent = "Please select the playlist to add song!";
    popupLibraryList.appendChild(textdiv);
    let checkIfLibrariesPresent = false;
    for (const libraryKey in librariesList) {
        if(!(libraryKey == "Home") && !(libraryKey == "Liked Songs")) {
            checkIfLibrariesPresent = true;
            console.log("Library key is : " + libraryKey);
            const div = document.createElement("div");
            div.classList.add("popup-library");
            const span = document.createElement('span');
            span.textContent = librariesList[libraryKey].title;
            span.classList.add('popup-liked');
            div.classList.add('librariespopup')
            div.appendChild(span);
            popupLibraryList.appendChild(div);
        }
    }
    if(checkIfLibrariesPresent == false) {
        textdiv.style.textAlign = "center";
        textdiv.textContent = "NO LIBRARIES PRESENT!";
    }
    librariespopups = Array.from(document.getElementsByClassName('librariespopup'));
    initializePopUplibraries();
}


function initializePopUplibraries() {
librariespopups.forEach((element) => {
    element.addEventListener('click', (e) => {
        const popupLibraryList = document.getElementById("librarylistpopup");
        console.log(e.target.textContent);
        alertClose.classList.add('hideAlerts');
        popupLibraryList.classList.add('hideAlerts');
        alertClose.classList.remove('displayAlerts');
        popupLibraryList.classList.remove('displayAlerts');
        addToLibrary(e.target.textContent, songIndex);
    })
})
}

function displaySongs (libraryKey) {
    saveLibraries();
    document.getElementById('rowdiv').innerHTML = "";
    console.log(JSON.parse(localStorage.getItem("libraries")));
    library = JSON.parse(localStorage.getItem("libraries"))[libraryKey];
    console.log(libraryKey);
    console.log(library[libraryKey]);
    var librarysongs = library.songs || [];
    var indexNo = 0;
    librarysongs.forEach((song) => {
        var cardDiv = document.createElement('div');
        cardDiv.classList.add('col-lg-2', 'col-md-3', 'col-4',  'cards', 'h-100');
        var playCover = document.createElement('i');
        playCover.classList.add('fas', 'fa-3x', 'fa-play-circle', 'masterPlayCover', 'playVisible');
        playCover.id = indexNo;
        indexNo++;
        var imageCover = document.createElement('img');
        imageCover.classList.add('cardimg-top');
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
    removeRedHearts();
    songIndex = 0;
    tempIndex = -1;
    audioElement.pause();
    myProgressBar.value = 0;

    if(JSON.parse(localStorage.getItem("libraries"))[currentLibraryKey].songs[0] != null) {
        audioElement.src = JSON.parse(localStorage.getItem("libraries"))[currentLibraryKey].songs[0].filepath;
    } else {
        audioElement.src =  null;
    }

    songItem = Array.from(document.getElementsByClassName('cards'));
    masterPlayCover = Array.from(document.getElementsByClassName('masterPlayCover'));
    songCard = Array.from(document.getElementsByClassName('cards'));
    
    masterPlayMobile.classList.remove('fa-pause');
    masterPlayMobile.classList.add('fa-play');
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');

    makeAllPlay();

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
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        masterPlayCover[songIndex].classList.add("fa-play-circle");
        masterPlayCover[songIndex].classList.remove("fa-pause-circle");
        masterPlayCover[songIndex].classList.add('playVisible');
        masterPlayCover[songIndex].classList.remove('colorRed');
    }
})



masterPlayMobile.addEventListener('click',()=>{
    tempIndex = songIndex;
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.volume = myVolumeBar.value / 100;
        audioElement.play();
            masterPlayMobile.classList.remove('fa-play');
            masterPlayMobile.classList.add('fa-pause');
       
        
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
            masterPlayMobile.classList.remove('fa-pause');
            masterPlayMobile.classList.add('fa-play');

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
                playingMobileSongDiv.style.position = 'relative';
                playingMobileSongDiv.style.bottom = '0px';
                playingMobileSongDiv.classList.remove('visuallyhidden');
                if(tempIndex != songIndex) {
                    tempIndex = songIndex;
                    audioElement.src = library.songs[songIndex].filepath;
                    makeAllPlay();
                    audioElement.currentTime = 0;
                    removeRedHearts();
                }
                audioElement.play();
                currentVolume = audioElement.volume;
               
               
                e.target.classList.remove("fa-play-circle");
                e.target.classList.add("fa-pause-circle");
                e.target.classList.remove('playVisible');
                e.target.classList.add('colorRed');

                    masterPlayMobile.classList.remove('fa-play');
                    masterPlayMobile.classList.add('fa-pause');

                    masterPlay.classList.remove('fa-play-circle');
                    masterPlay.classList.add('fa-pause-circle');


                masterSongName.innerText = library.songs[songIndex].songName;
                coverSongName.innerText = library.songs[songIndex].songName;
                footCoverImage.src = library.songs[songIndex].coverPath;
                playingCoverImage.src = library.songs[songIndex].coverPath;
            } else {
                e.target.classList.remove("fa-pause-circle");
                audioElement.pause();
                e.target.classList.add("fa-play-circle");
  
                    masterPlayMobile.classList.remove('fa-pause');
                    masterPlayMobile.classList.add('fa-play');

                    masterPlay.classList.remove('fa-pause-circle');
                    masterPlay.classList.add('fa-play-circle');


                e.target.classList.add('playVisible');
                e.target.classList.remove('colorRed');
            }
        })
    })
}

playNext.addEventListener('click', ()=> {
    audioElement.volume = myVolumeBar.value / 100;
        removeRedHearts();
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

            masterPlayMobile.classList.remove('fa-play');
            masterPlayMobile.classList.add('fa-pause');

            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');

        playingCoverImage.src = library.songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        currentVolume = audioElement.volume;
})

playPrev.addEventListener('click', ()=> {
    audioElement.volume = myVolumeBar.value / 100;
    removeRedHearts();
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

            masterPlayMobile.classList.remove('fa-play');
            masterPlayMobile.classList.add('fa-pause');

            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');

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
    localStorage.setItem("libraries", JSON.stringify(JSON.parse(localStorage.getItem("libraries")) || libraries));
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
    librarylistpopup.classList.add('hideAlerts');
    librarylistpopup.classList.remove('displayAlerts');
})

acceptName.addEventListener('click', () => {
    var playlistName = inputClassName.value;
    inputClassName.value = "";
    alertClose.classList.add('hideAlerts');
    alertBox.classList.add('hideAlerts');
    alertClose.classList.remove('displayAlerts');
    alertBox.classList.remove('displayAlerts');
    createLibrary(playlistName);
})

function createLibrary (libraryName) {
    console.log("inside create library function");
    const newLibraryKey = libraryName;

        const existingLibraries = JSON.parse(localStorage.getItem("libraries")) || {};

        // Add the new library to the existing libraries object
        existingLibraries[newLibraryKey] = {
            title: libraryName,
            songs: []
        };
    
        // Update the libraries object in localStorage
        localStorage.setItem("libraries", JSON.stringify(existingLibraries));

        displayLibraryList();
}

function deleteLibrary(libraryName) {
    const libraries = JSON.parse(localStorage.getItem('libraries')) || {};

    if (libraries.hasOwnProperty(libraryName)) {
        delete libraries[libraryName];

        localStorage.setItem('libraries', JSON.stringify(libraries));

        console.log(`Library "${libraryName}" has been deleted.`);
        // Optionally, you might want to update your UI or perform other actions here.
    } else {
        console.log(`Library "${libraryName}" does not exist.`);
    }
}

hearts.forEach((heart) => {
    heart.addEventListener('click', () =>{
        console.log(libraries[currentLibraryKey].songs[songIndex]);
        addtoliked(songIndex);
        allHeartRed();
    })
})

booksicon.forEach((bookicon) => {
    bookicon.addEventListener('click', () =>{
        console.log(libraries[currentLibraryKey].songs[songIndex]);
        libraryListPopup();

    })
})

function libraryListPopup() {
    alertClose.classList.remove('hideAlerts');
    librarylistpopup.classList.remove('hideAlerts');
    alertClose.classList.add('displayAlerts');
    librarylistpopup.classList.add('displayAlerts');
}

function allHeartRed() {
    hearts.forEach((heart) => {
        heart.classList.add('colorDarkblue');
    })
}

function removeRedHearts() {
    hearts.forEach((heart) => {
        heart.classList.remove('colorDarkblue');
    })
}

repeatIcon.addEventListener('click', () => {
    if(repeatIcon.classList.contains('colorDarkblue')) {
        repeatIcon.classList.remove('colorDarkblue');
        flagRepeat = false;
    } else {
        repeatIcon.classList.add('colorDarkblue');
        flagRepeat = true;
    }
})

function addToLiked(songIndex){
    const song = libraries.Home.songs[songIndex];

    const savedlibrary = JSON.parse(localStorage.getItem('libraries'));
    const likedSongs = savedlibrary['Liked Songs'];
    
    if (!likedSongs.songs.includes(song)) {
        likedSongs.songs.push(song);
    }
}

function addtoliked(songIndex) {
    // Get the existing "Liked Songs" playlist from localStorage
    const song = libraries.Home.songs[songIndex];
    const likedSongs = JSON.parse(localStorage.getItem("libraries"))["Liked Songs"].songs || [];

    // Check if the song is already in the likedSongs playlist
    const existingSong = likedSongs.find(existing => existing.id === song.id);
    if (!existingSong) {
        // If the song is not already in the playlist, add it
        likedSongs.push(song);

        // Update the localStorage with the new likedSongs playlist
        localStorage.setItem("libraries", JSON.stringify({
            ...JSON.parse(localStorage.getItem("libraries")),
            "Liked Songs": {
                title: "Liked Songs",
                songs: likedSongs
            }
        }));
    }

}

function addToLibrary(libraryName, songIndex) {

    
    const existingLibraries = JSON.parse(localStorage.getItem("libraries")) || libraries;
    const song = existingLibraries.Home.songs[songIndex];
    const librarysongs = JSON.parse(localStorage.getItem("libraries"))[libraryName].songs || [];

    // Check if the song is already in the likedSongs playlist
    const existingSong = librarysongs.find(existing => existing.id === song.id);
    if (!existingSong) {
        // If the song is not already in the playlist, add it
        librarysongs.push(song);

        existingLibraries[libraryName] = {
            title: libraryName,
            songs: librarysongs,
        };
    
        // Update the libraries object in localStorage
        localStorage.setItem("libraries", JSON.stringify(existingLibraries));

    }
}
let currentSelectedPlaylist = null;
let flagSelectedPlaylist = false;


function initializeDeleteIcons() {
deleticons.forEach((deleteicon) => {
    deleteicon.addEventListener('click', (e)=> {
        if(flagSelectedPlaylist == true) {
            currentSelectedPlaylist.getElementsByClassName('divdelete')[0].classList.add('hideDiv');
        }
        flagSelectedPlaylist = true;
        console.log(e.target);
        currentSelectedPlaylist = e.target.parentElement;
        e.target.parentElement.getElementsByClassName('divdelete')[0].classList.remove('hideDiv');
    })
})
}

function checkclickOutsideLibrary(event) {
   if(flagSelectedPlaylist == true && !(currentSelectedPlaylist.contains(event.target))){
    currentSelectedPlaylist.getElementsByClassName('divdelete')[0].classList.add('hideDiv');
    flagSelectedPlaylist = false;
   }
}

function switchLibrary (libraryKey) {

    currentLibraryKey = libraryKey;
    displaySongs(currentLibraryKey);
}

function initializeDeleteButtons() {
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', (e) => {
            console.log(e.target.parentElement.getElementsByClassName('liked')[0].textContent);
            deleteLibrary(e.target.parentElement.getElementsByClassName('liked')[0].textContent);
            displayLibraryList();
        })
    })

}

function initializePlaylistLibrary() {

playlists.forEach((playlist) => {
    playlist.addEventListener('click', (e) => {
        console.log(e.target.textContent)
        switchLibrary(e.target.textContent);
        
        
        removeAllClickedPlaylist();

        e.target.parentElement.classList.add('playlist-clicked');
        e.target.classList.add('playlist-clicked');
        if(e.target.textContent != "Liked Songs"){
            e.target.parentElement.getElementsByClassName('fa-ellipsis')[0].classList.add('playlist-clicked');
        }
    })
})
}

function removeAllClickedPlaylist() {
    playlists.forEach((playlist) => {
            playlist.classList.remove('playlist-clicked');
            console.log(playlist);
            playlist.parentElement.classList.remove('playlist-clicked');

            if(playlist.textContent != "Liked Songs"){
                playlist.parentElement.getElementsByClassName('fa-ellipsis')[0].classList.remove('playlist-clicked');
            }
        })
    homeButton.classList.remove('button-clicked');
    document.getElementById('homeButtonName').classList.remove('button-clicked');
    document.getElementById('homeIcon').classList.remove('button-clickedhome');
    document.getElementById('homeIcon').classList.add('iconspacing');
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
if(changedLibrary != initialLibrary) {
    console.log("changed library");
    myProgressBar.value = 0;

    myProgressBarMobile.setAttribute("aria-valuenow", 0);
    myProgressBarMobile.style.width = 0 + "%";
    initialLibrary = changedLibrary;
} else {
    if(flagRepeat == true && audioElement.currentTime == audioElement.duration){
        audioElement.currentTime = 0;
        audioElement.play();
    } else if (audioElement.currentTime == audioElement.duration) {
        document.getElementById("next").click();
    }
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;

    myProgressBarMobile.setAttribute("aria-valuenow", progress);
    myProgressBarMobile.style.width = progress + "%";
}

time();
})
    
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = ((myProgressBar.value)*(audioElement.duration))/100;
    time();
})


progresss.addEventListener("click", function (event) {
    // Calculate the percentage width based on the click position
    const clickX = event.clientX - progresss.getBoundingClientRect().left;
    const progressBarWidth = progresss.clientWidth;
    const percentage = (clickX / progressBarWidth) * 100;

    // Update the width of the progress bar
    myProgressBarMobile.style.width = percentage + "%";

    // Update the aria-valuenow attribute
    myProgressBarMobile.setAttribute("aria-valuenow", percentage);
    audioElement.currentTime = (( percentage)*(audioElement.duration))/100;
    time();
});




myProgressBarMobile.addEventListener('change', ()=>{
    console.log("Hello changes")
    audioElement.currentTime = (( myProgressBarMobile.getAttribute("aria-valuenow"))*(audioElement.duration))/100;
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
        document.getElementById("searchbaricon").classList.remove("button-clickedhome");
        document.getElementById('searchbaricon').classList.add('iconspacing');
        document.getElementById("search").classList.add("hidesearchbar");
    }
}

function checkClickOutsideMobile(event) {

    if ((!searchMobileDiv.contains(event.target) && !searchBarMobile.contains(event.target))  && searchMobile.value == "") {
        console.log('clicked outside  of mobile seach icon');

        searchMobileIcon.classList.remove("button-clicked-mobile");

        searchMobileDiv.classList.add('visuallyhidden');    
        searchMobileDiv.style.display = "none";

    }
}

searchBar.addEventListener("click", () =>{
    mySpan.classList.add("hidesearchspan");
    document.getElementById("searchbaricon").classList.add("searchbariconright");
    document.getElementById("searchbaricon").classList.add("button-clickedhome");
    document.getElementById('searchbaricon').classList.remove('iconspacing');
    // document.getElementById('homeIcon').classList.add('button-clickedhome');
    document.getElementById("search").classList.remove("hidesearchbar");
})

searchMobileIcon.addEventListener("click", () =>{
    console.log("clicked on mobile seach icon");

    searchMobileIcon.classList.add("button-clicked-mobile");

    setTimeout(function () {
        searchMobileDiv.classList.remove('visuallyhidden');
      }, 100);
    searchMobileDiv.style.display = "block";
    console.log(searchMobileDiv);

})

document.addEventListener('click', checkClickOutside);
document.addEventListener('click', checkClickOutsideMobile);
document.addEventListener('click', checkclickOutsideLibrary);


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

function searchFunctionMobile() {
    let filter = searchMobile.value.toUpperCase();
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
    removeAllClickedPlaylist();
    homeButton.classList.add('button-clicked');
    document.getElementById('homeButtonName').classList.add('button-clicked');
    document.getElementById('homeIcon').classList.remove('iconspacing');
    document.getElementById('homeIcon').classList.add('button-clickedhome');
    switchLibrary("Home");
})


function setDocHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);
};

addEventListener('resize', setDocHeight);
addEventListener('orientationchange', setDocHeight);