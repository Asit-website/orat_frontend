const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

const BASE_URL = 'https://orat.in';

const links = [
  '/', '/category', '/designers', '/products',
  '/checkout', '/address', '/payment', '/myaccount',
  '/orderhistory', '/addaddress', '/credits', '/wishlist',
  '/settings', '/giftcards', '/shipping-information',
  '/how-to-shop', '/contact', '/return-and-exchange',
  '/terms-and-conditions', '/privacy-cookie-policy', '/faqs',
  '/about-us', '/book-appointment', '/blogs', '/personalDetails'
];

const dynamicRoutes = [
  '/products/productdetails/sample-id',
  '/giftdetails/sample-id',
  '/ordersuccess/sample-id',
  '/blogdetails/sample-id'
];

const sitemap = new SitemapStream({ hostname: BASE_URL });
const writeStream = createWriteStream('./public/sitemap.xml');

sitemap.pipe(writeStream);

[...links, ...dynamicRoutes].forEach(url => {
  sitemap.write({ url, changefreq: 'weekly', priority: 0.7 });
});

sitemap.end();

streamToPromise(sitemap).then(() => {
  console.log('✅ Sitemap generated at public/sitemap.xml');
});


// node generate-sitemap.js
