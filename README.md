jardineriajoseba
================
## Webpage
Personal webpage for Jardinería Joseba.

## Building

First, clone the app to your computer.
```
git clone git@github.com:psalaberria002/jardineriajoseba.git
```

Then build the client app. You will need [Node.js](http://nodejs.org/download/)
for this.

``` 
# Go to folder
cd jardineriajoseba

# Install dependencies
npm install -g grunt-cli
npm install

# Compress JS, compress CSS. 
grunt
```



## Running in localhost
```
cd jardineriajoseba/app
./simpleserver.sh
```
As a convenience, you can use `grunt watch` to build automatically when
you update files.
