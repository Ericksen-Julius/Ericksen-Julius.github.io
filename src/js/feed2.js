var shareImageButton = document.querySelector('#install-btn');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
var sharedCard = document.querySelector('#container-cards');

function openCreatePostModal() {
    // createPostArea.style.display = 'block';
    console.log('check')
    if (deferredPrompt) {
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then(function (choiceResult) {
            console.log(choiceResult.outcome);

            if (choiceResult.outcome === 'dismissed') {
                console.log('User cancelled installation');
            } else {
                console.log('User added to home screen');
            }
        });

        deferredPrompt = null;
    }

    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.getRegistrations()
    //     .then(function(registrations) {
    //       for (var i = 0; i < registrations.length; i++) {
    //         registrations[i].unregister();
    //       }
    //     })
    // }
}

function closeCreatePostModal() {
    createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

// closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

// Currently not in use, allows to save assets in cache on demand otherwise
// function onSaveButtonClicked(event) {
//     console.log('clicked');
//     if ('caches' in window) {
//         caches.open('user-requested')
//             .then(function (cache) {
//                 cache.add('https://httpbin.org/get');
//                 cache.add('/src/images/sf-boat.jpg');
//             });
//     }
// }

function clearCards() {
    // console.log("test")
    while (sharedCard.hasChildNodes()) {
        sharedCard.removeChild(sharedCard.lastChild);
    }
}
clearCards()

function createCard(data) {
    var cardWrapper = document.createElement('div');
    cardWrapper.className = 'col-lg-4 col-md-6 col-12 mb-5 card-gym';
    cardWrapper.innerHTML = `
    <a href="detail.html?id=${data.id}">
        <img src="./src/images/${data.image}" style="width: 100%; height: 250px;" alt="${data.title}">
        <div class="title px-3">
            <h1 class="text-light">${data.title}</h1>
        </div>
    </a>`;

    sharedCard.appendChild(cardWrapper);

}

function updateUI(data) {
    for (var i = 0; i < data.length; i++) {
        createCard(data[i]);
    }
}

var url = 'https://ambw-pert4-e94e4-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json';
var networkDataReceived = false;

fetch(url)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        networkDataReceived = true;
        console.log('From web', data);
        clearCards();
        var dataArray = [];
        for (var key in data) {
            dataArray.push(data[key]);
        }
        updateUI(dataArray);
    });

if ('indexedDB' in window) {
    readAllData('posts')
        .then(function (data) {
            if (!networkDataReceived) {
                console.log('From cache', data);
                updateUI(data);
            }
        });
}
