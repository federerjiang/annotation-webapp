# Deploy the react frontend on VM server

1. run `npm build` to build code into the `build` folder.
2. move `build` folder to `/usr/share/nginx/html/`
3. move `/usr/share/nginx/html/build/index.html` to `/usr/share/nginx/html/index.html`
4. modify nginx to be the reverse proxy server for react app (refer the nginx.conf file in this folder)
   - find nginx configuration file here `/etc/nginx/nginx.conf`
   - modify `nginx.conf` as follows:
     - add `location block` as :
       location /api {
       proxy_pass http://nodeApp;
       }
     - add upstream:
       upstream nodeApp {
       server 127.0.0.1:8010;
       }
