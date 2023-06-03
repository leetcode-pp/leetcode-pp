yarn
yarn build
cp ./docs/CNAME ./dist/CNAME
cp ./dist/index.html ./dist/404.html
gco gh-pages
cp -R ./dist/* .
git add .
git commit -m '自动发布'
git push