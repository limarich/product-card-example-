const STAR_FILL_SRC = "./assets/star-fill.png";
const STAR_SRC = "./assets/star.png";
const CART_SRC = "./assets/cart.png";

class Productcard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.build());
    shadow.appendChild(this.style());
  }

  build() {
    const componentRoot = document.createElement("div");
    componentRoot.setAttribute("class", "product-card");

    const productImage = document.createElement("img");
    productImage.setAttribute("class", "product-card--image");
    productImage.setAttribute("src", this.getAttribute("image-url"));
    productImage.setAttribute(
      "alt",
      this.getAttribute("image-alt") || "produto"
    );
    const title = document.createElement("h1");
    title.setAttribute("class", "title");
    title.innerText = this.getAttribute("name");
    const description = document.createElement("p");
    description.setAttribute("class", "description");
    description.innerText = this.getAttribute("description");

    componentRoot.appendChild(productImage);
    componentRoot.appendChild(title);
    componentRoot.appendChild(description);
    componentRoot.appendChild(this.handleProductInfo());
    componentRoot.appendChild(this.handleCartButton());
    return componentRoot;
  }

  style() {
    const style = document.createElement("style");
    style.textContent = `      
  .product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    padding: 1rem 0.5rem;
    border-radius: 8px;
    background: #fefefe;
    box-shadow: 1px 1px 10px #00000044;
    gap: 0.65rem;
    transform: scale(.85);
  }
  .product-card .title {
    font-size: 1.5rem;
    font-weight: 500;
  }
  .product-card .description {
    font-size: 1.2rem;
    font-weight: 500;
  }
  .product-card .product-card--image {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 8px;
  }
  .product-card--info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .product-card .product-card--info .stars {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: .25rem;
  }
  .product-card .product-card--info .stars span {
    font-size: .8rem;
    font-weight: 600;
  }
  .product-card .product-card--info .stars img {
    width: 20px;
    height: 20px;
  }
  .product-card .product-card--info .value {
    font-weight: 600;
    color: #383737;
    font-size: 2rem;
  }
  .product-card .add-cart {
    all: unset;
    cursor: pointer;
    background: rgb(222, 189, 203);
    padding: 1rem 1.5rem;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    gap: 0.5rem;
  }

  @media screen and (max-width: 480px) {
    .product-card {
      width: 320px;
      font-size: .8rem;
      padding: 1rem;
    }
    .product-card .product-card--image {
      width: 270px;
      height: 270px;
    }
  }

    `;
    return style;
  }

  handleStars() {
    const starsContainer = document.createElement("div");
    const starsNumber = parseInt(this.getAttribute("stars") || "0");

    starsContainer.setAttribute("class", "stars");

    for (let i = 0; i < starsNumber; i++) {
      const starFill = document.createElement("img");
      starFill.setAttribute("src", STAR_FILL_SRC);
      starsContainer.appendChild(starFill);
    }
    for (let i = 0; i < 5 - starsNumber; i++) {
      const star = document.createElement("img");
      star.setAttribute("src", STAR_SRC);
      starsContainer.appendChild(star);
    }
    const starsValue = document.createElement("span");
    starsValue.innerText = `${parseFloat(
      this.getAttribute("stars") || "0"
    ).toFixed(2)}`;
    starsContainer.appendChild(starsValue);
    return starsContainer;
  }
  handleCartButton() {
    const cartButton = document.createElement("button");
    cartButton.setAttribute("type", "button");
    cartButton.setAttribute("class", "add-cart");

    const cartButtonText = document.createElement("span");
    cartButtonText.innerText = "Adicionar Ao Carrinho";
    const cartButtonIcon = document.createElement("img");
    cartButtonIcon.setAttribute("src", CART_SRC);
    cartButton.setAttribute("alt", "adicionar ao carrinho");

    cartButton.appendChild(cartButtonText);
    cartButton.appendChild(cartButtonIcon);

    return cartButton;
  }
  handleProductInfo() {
    const info = document.createElement("div");
    info.setAttribute("class", "product-card--info");

    const value = document.createElement("span");
    value.setAttribute("class", "value");
    value.innerText = parseFloat(
      this.getAttribute("value") || "0"
    ).toLocaleString("pt-br", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    info.appendChild(this.handleStars());
    info.appendChild(value);

    return info;
  }
}

customElements.define("product-card", Productcard);
