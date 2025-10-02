console.log("index loaded");

const list = document.querySelector(".category_list_container");

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((res) => res.json())
  .then((categories) => {
    const keep = new Set(["Accessories", "Apparel", "Footwear", "Free Items", "Personal Care", "Sporting Goods"]);
    const filtered = categories.filter((c) => keep.has(c.category));

    list.innerHTML = filtered
      .map(
        (c) => `
      <a href="productlist.html?category=${encodeURIComponent(c.category)}">${c.category}</a>
    `
      )
      .join("");
  })
  .catch((err) => {
    console.error(err);

    list.innerHTML = `
      <a href="productlist.html?category=Accessories">Accessories</a>
      <a href="productlist.html?category=Apparel">Apparel</a>
      <a href="productlist.html?category=Footwear">Footwear</a>
      <a href="productlist.html?category=Free%20Items">Free Items</a>
      <a href="productlist.html?category=Personal%20Care">Personal Care</a>
      <a href="productlist.html?category=Sporting%20Goods">Sporting Goods</a>
    `;
  });
