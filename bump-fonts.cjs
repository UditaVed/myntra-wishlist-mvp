const fs = require('fs');
let content = fs.readFileSync('src/components/ProductDetailPage.jsx', 'utf8');

content = content.replace(/\btext-xs\b/g, 'text-sm');
content = content.replace(/text-\[11px\]/g, 'text-sm');
content = content.replace(/text-\[10px\]/g, 'text-xs');
content = content.replace(/\btext-sm\b/g, 'text-base'); // let's bump the ones that were text-sm before (and now also the ones that just became text-sm? No, wait!)

// Better approach to avoid double replacing:
let content2 = fs.readFileSync('src/components/ProductDetailPage.jsx', 'utf8');
content2 = content2.replace(/\btext-xs\b/g, 'REPLACE_XS');
content2 = content2.replace(/text-\[11px\]/g, 'REPLACE_11');
content2 = content2.replace(/text-\[10px\]/g, 'REPLACE_10');
content2 = content2.replace(/\btext-sm\b/g, 'REPLACE_SM');
content2 = content2.replace(/\btext-base\b/g, 'REPLACE_BASE');

content2 = content2.replace(/REPLACE_BASE/g, 'text-lg');
content2 = content2.replace(/REPLACE_SM/g, 'text-base');
content2 = content2.replace(/REPLACE_XS/g, 'text-sm');
content2 = content2.replace(/REPLACE_11/g, 'text-sm');
content2 = content2.replace(/REPLACE_10/g, 'text-xs');

fs.writeFileSync('src/components/ProductDetailPage.jsx', content2);
console.log("Updated font sizes in ProductDetailPage.jsx");
