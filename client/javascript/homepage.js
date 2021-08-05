import { getUrl, getBanner, getProducts } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  renderBanner();
  renderFeaturedProducts();
});

async function renderBanner() {
  const banner = await getBanner();
  const bannerImage = document.getElementById('banner');
  const bannerUrl = getUrl() + banner.hero_banner.url;
  bannerImage.src = bannerUrl;
  console.log(banner);
}

async function renderFeaturedProducts() {
  const products = await getProducts();

  const featuredProducts = products.filter((product) => product.featured);

  const featuredProductsContainer =
    document.getElementById('featured-products');

  for (let i = 0; i < featuredProducts.length; i++) {
    const featuredProduct = featuredProducts[i];

    const featuredProductContainer = document.createElement('div');

    const featuredProductTitle = document.createElement('h2');
    featuredProductTitle.innerText = featuredProduct.title;

    const featuredProductImage = document.createElement('img');
    featuredProductImage.className = 'featured-product-image';
    featuredProductImage.src = getUrl() + featuredProduct.image.url;

    const featuredProductDescription = document.createElement('p');
    featuredProductDescription.innerText = featuredProduct.description;

    const featuredProductPrice = document.createElement('p');
    featuredProductPrice.innerText = featuredProduct.price;

    featuredProductsContainer.appendChild(featuredProductContainer);
    featuredProductContainer.appendChild(featuredProductTitle);
    featuredProductContainer.appendChild(featuredProductImage);
    featuredProductContainer.appendChild(featuredProductDescription);
    featuredProductContainer.appendChild(featuredProductPrice);
  }

  console.log(featuredProducts);
}
