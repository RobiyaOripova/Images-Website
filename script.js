const submit = document.querySelector(".flex-form"),
  input = document.querySelector(".input-1"),
  buttoncon = document.querySelector(".mybtn"),
  // hcard = document.querySelector(".card"),
  cardColumns = document.querySelector(".card-columns"),
  cardContainer = document.querySelector(".card-container");

const photos = new Photos();
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let how = 0;
submit.addEventListener("submit", SearchImage);

function SearchImage(e) {
  e.preventDefault();
  let term = input.value;
  console.log(term);

  if (term.trim()) {
    console.log(term.trim());
    window.open("search.html?" + term);
  } else {
    alert("Value please");
  }
  input.value = "";
}

function loaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
  }
}

class UI {
  static clickMe(img, myc) {
    myc.addEventListener("click", () => {
      cardContainer.innerHTML = "";
      cardContainer.classList.toggle("cardConActive");

      cardContainer.innerHTML = `
               
              
            <div class="whitecard">
            
                <div class="image-info">
                    <div class="author">
                        <img src="${img.user.profile_image.small}" alt="">
                        <p class="author-name">${img.user.name}</p>
                    </div>
            
            
                </div>
            
            
                <div class="image">
                    <img src="${img.urls.regular}" alt="">
                </div>
                <div class="info">
                    <p class="info-p">views</p>
                    <p> ${img.views}</p>
                    <p class="info-p">downloads</p>
                    <p>${img.downloads}</p>
                    <p class="info-p">Likes</p>
                    <p>${img.likes}</p>
                </div>
            </div>
            
            
            `;
    });
  }

  static addDomToUI() {
    imagesLoaded = 0;
    photos.getPhotos().then((res) => {
      totalImages = res.length;

      res.map((p) => {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        UI.clickMe(p, card);
        card.setAttribute("data-id", `${p.id}`);
        /* card.setAttribute("data-imageId", `${p.id}`);*/

        let img = document.createElement("img");
        img.className = "card-img-top";
        img.src = p.urls.regular;

        img.addEventListener("load", loaded);

        card.appendChild(img);

        cardColumns.appendChild(card);
      });
    });
  }
}

cardContainer.addEventListener("click", () => {
  cardContainer.classList.remove("cardConActive");
});

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    how++;

    ready = false;
    if (how === 3) {
      let button = document.createElement("div");
      button.innerText = "Load more";
      button.setAttribute("class", "btn");
      buttoncon.appendChild(button);
      buttoncon.style.display = "block";
      console.log(buttoncon);
      button.addEventListener("click", UI.addDomToUI);
    } else {
      UI.addDomToUI();

      buttoncon.style.display = "none";
    }
  }
});
