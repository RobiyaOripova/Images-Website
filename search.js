const container = document.querySelector(".heading");
let term = window.location.search.split('?')[1];



function search() {
    photos.getSearch(term).then(res => {

            container.innerHTML = `<h3> Search Reasults for  ${term}</h3>`;
            if (res.results.length === 0) {

                container.innerHTML = `<h2>No search reasult</h2>`;
            } else {
                res.results.map(
                    p => {


                        let img = document.createElement("img");
                        img.className = "card-img-top";
                        img.src = p.urls.regular;
                        let card = document.createElement("div");
                        card.setAttribute("class", "card");
                        UI.clickMe(p, card);
                        card.appendChild(img);
                        cardColumns.appendChild(card);

                    }
                )



            }

        }


    )
}
document.addEventListener("DOMContentLoaded", search);