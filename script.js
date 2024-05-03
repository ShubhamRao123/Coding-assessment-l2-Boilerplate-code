let productDiv = document.querySelector(".product");

let displayProducts = async () => {
  productDiv.innerHTML = "";

  try {
    let response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );

    let data = await response.json();

    // function to calculate discounted percentage:
    const calculateDiscountPercentage = (price, compareAtPrice) => {
      if (!compareAtPrice || compareAtPrice <= price) {
        return null;
      }
      const discount = (compareAtPrice - price) / compareAtPrice;
      return Math.round(discount * 100);
    };

    //Function to display product based on category:
    const displayProductsByCategory = (categoryName) => {
      productDiv.innerHTML = "";
      const category = data.categories.find(
        (category) => category.category_name === categoryName
      );
      if (category) {
        category.category_products.forEach((product) => {
          const discountPercentage = calculateDiscountPercentage(
            parseFloat(product.price),
            parseFloat(product.compare_at_price)
          );

          productDiv.innerHTML += `<div class="productItem">
            <div class="img_container">
              <div class="text">${product.badge_text}</div>
              <img src="${product.image}" alt="">
            </div>
            <span class="name">
              <h3>${product.title}</h3>
              <ul class="vendor-list">
                <li>${product.vendor}</li>
              </ul>
            </span>
            <div class="price">
              <p id="pri">${product.price} </p>
              <p id="cpri">${product.compare_at_price} </p>
              <p id="discount">(${discountPercentage}% off)</p>
            </div>
            <button class="btn_cart">Add to Cart</button>
          </div>`;
        });
      } else {
        alert("Category not found");
      }
    };

    document.getElementById("menBtn").addEventListener("click", () => {
      displayProductsByCategory("Men");
    });
    document.getElementById("womenBtn").addEventListener("click", () => {
      displayProductsByCategory("Women");
    });
    document.getElementById("kidsBtn").addEventListener("click", () => {
      displayProductsByCategory("Kids");
    });
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
};

displayProducts();
