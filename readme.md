# PDF PAGES TO BASE64 (IMAGES)

## If you want to install only package
```
npm i pdf-pages-to-base64-image --save
```

## You will make the add-ons yourself, you can download the repository.

```
https://github.com/Rashad-Yusifov/pdf-pages-to-base64-image
```


## How to use ? (example)

```
    import PdfPagesToBase64Image from 'pdf-pages-to-base64-image'; 

    // you must first call this command

    PdfPagesToBase64Image.initDependency();

    // let's keep it up (options) | if you want see more options, please check bottomest of the page


    const options = {
        quality: 1.0,   // 0.1 - 1.0 this range is quality of base64's images
        pdf: 'https://www.YOURSITE.com/your.pdf',   
        getCanvas: false, // when you change it true, you will get canvas tag
        getUrl: true // it's for base64 (images) if you don't need it, you can be false it
    };

    


    // let's keep it up (use)


    PdfPagesToBase64Image.createPages(options).then(res => {
       console.log(res) 
    }).catch(err => {
      console.log(err)
    });



     // And also you can get total Pdf pages count
   
     let totalPage = PdfPagesToBase64Image.totalPage; 


```


## When you have success output it will like that

```
   {
        code: 200,
        message: "SUCCESS",
        data: [
            {
                base64: (...),
                canvas: (element) // if you did select canvas: true
            }
        ]
    }   
```



## When you have error output it will like that

```
   {
        code: 400,
        message: "ERROR",
    }   
```



## Thank you so much for downloading.


```
    if it worked for you, you might add Star.
    that's all.
```
