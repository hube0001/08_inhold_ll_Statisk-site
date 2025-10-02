console.log("product list loaded");

const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "Apparel";

const titleEl = document.querySelector(".category-title");
const listEl = document.querySelector(".product_list");

if (titleEl) titleEl.textContent = category;
if (listEl) {
  listEl.innerHTML = "<p>Loading…</p>";
}

const apiUrl = `https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(category)}`;

fetch(apiUrl)
  .then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  })
  .then(showProducts)
  .catch((err) => {
    console.error(err);
    if (listEl) listEl.innerHTML = "<p>Kunne ikke hente produkter.</p>";
  });

function showProducts(products) {
  if (!Array.isArray(products) || products.length === 0) {
    listEl.innerHTML = "<p>Ingen produkter fundet.</p>";
    return;
  }

  listEl.innerHTML = products
    .map((p) => {
      const isSoldOut = !!p.soldout;
      const hasDiscount = !!p.discount;
      const newPrice = hasDiscount ? Math.round(p.price * (1 - p.discount / 100)) : p.price;

      return `
      <article class="card ${hasDiscount ? "card--discount" : ""} ${isSoldOut ? "card--soldout" : ""}">
        <a class="card__media" href="product.html?id=${p.id}">
          ${isSoldOut ? '<span class="flag">Sold out</span>' : ""}
          ${hasDiscount ? '<span class="flag badge--discount">-' + p.discount + "%</span>" : ""}
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${p.id}.webp" alt="${p.productdisplayname}">
        </a>
        <h3 class="card__title"><a href="product.html?id=${p.id}">${p.productdisplayname}</a></h3>
        <p class="card__meta">${p.brandname} • ${p.articletype}</p>
        <div class="card__price">
          ${hasDiscount ? `<span class="price-old">DKK ${p.price},-</span>` : ""}
          <span class="price price-new">DKK ${newPrice},-</span>
        </div>
        <a class="card__more" href="product.html?id=${p.id}">Se mere</a>
      </article>
    `;
    })
    .join("");
}
