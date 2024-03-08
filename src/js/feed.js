// var shareImageButton = document.querySelector('#share-image-button');
// var createPostArea = document.querySelector('#create-post');
// var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');
var details = document.querySelector('#details');
var searchParams = new URLSearchParams(window.location.search);

// Get the value of the 'id' parameter
var id = searchParams.get("id");
// console.log(id);

clearCards();
if (!navigator.onLine) {
  if (localStorage.getItem(id) != null) {
    console.log('From local', localStorage.getItem(id));
    createDetail(JSON.parse(localStorage.getItem(id)));
  }
} else {
  var url = `https://ambw-pert4-e94e4-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json`;
  var networkDataReceived = false;
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      networkDataReceived = true;
      console.log('From web', data);
      createDetail(data);
      if (localStorage.getItem(data.id) == null) {
        var toJSON = JSON.stringify(data)
        localStorage.setItem(data.id, toJSON)
      }
      // console.log("Items stored in local storage:");
      // for (var i = 0; i < localStorage.length; i++) {
      //   var key = localStorage.key(i); // Get the key at index i
      //   var item = localStorage.getItem(key); // Get the item associated with the key
      //   console.log(key + ": " + item); // Log the key-value pair
      // }

    });
}

// function openCreatePostModal() {
//   createPostArea.style.display = 'block';
//   if (deferredPrompt) {
//     deferredPrompt.prompt();

//     deferredPrompt.userChoice.then(function (choiceResult) {
//       console.log(choiceResult.outcome);

//       if (choiceResult.outcome === 'dismissed') {
//         console.log('User cancelled installation');
//       } else {
//         console.log('User added to home screen');
//       }
//     });

//     deferredPrompt = null;
//   }

//   // if ('serviceWorker' in navigator) {
//   //   navigator.serviceWorker.getRegistrations()
//   //     .then(function(registrations) {
//   //       for (var i = 0; i < registrations.length; i++) {
//   //         registrations[i].unregister();
//   //       }
//   //     })
//   // }
// }

// function closeCreatePostModal() {
//   createPostArea.style.display = 'none';
// }

// shareImageButton.addEventListener('click', openCreatePostModal);

// closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);

// // Currently not in use, allows to save assets in cache on demand otherwise
// function onSaveButtonClicked(event) {
//   console.log('clicked');
//   if ('caches' in window) {
//     caches.open('user-requested')
//       .then(function (cache) {
//         cache.add('https://httpbin.org/get');
//         cache.add('/src/images/sf-boat.jpg');
//       });
//   }
// }

function clearCards() {
  while (details.hasChildNodes()) {
    details.removeChild(details.lastChild);
  }
}

function createDetail(data) {
  console.log(data);
  var imageWrapper = document.createElement('div');
  imageWrapper.className = 'col-lg-10 col-12 mx-auto mb-3';
  imageWrapper.innerHTML = `
    <img src="./src/images/${data.image}" style="width: 100%;" alt=${data.title}>
  `;
  var titleWrapper = document.createElement('div');
  titleWrapper.className = 'col-3 mb-3 text-light';
  titleWrapper.innerHTML = `
    <h1>${data.title}</h1>
  `;
  var descriptionWrapper = document.createElement('div');
  descriptionWrapper.className = 'col-12';
  descriptionWrapper.innerHTML = `
  <p class="text-light fs-5">${data.description}</p>
  `;
  details.appendChild(imageWrapper)
  details.appendChild(titleWrapper)
  details.appendChild(descriptionWrapper)
}

// function updateUI(data) {
//   clearCards();
//   for (var i = 0; i < data.length; i++) {
//     createCard(data[i]);
//   }
// }




// if ('indexedDB' in window) {
//   readAllData('posts')
//     .then(function (data) {
//       if (!networkDataReceived) {
//         console.log('From cache', data);
//         updateUI(data);
//       }
//     });
// }
