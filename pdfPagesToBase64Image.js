const initDependency = function(){
    document.writeln("<script src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.228/pdf.min.js'></script>");
}

let totalPage = null;

const createPages = async ({ pdf, quality = 1.0, getCanvas = false, getUrl = true }) => {
    return new Promise((resolve, reject) => {
        let images = [];
        let i = 1;
        let docs,
            totalPages,
            renderContext,
            viewport,
            page,
            canvas = document.createElement("canvas");
        canvas.width = 595;
        const toBase64 = async (src) => {
            try {
                docs = await pdfjsLib.getDocument({ url: src });
                getPage(i);
                totalPages = docs.numPages;
                totalPage = docs.numPages;
            } catch (error) {
                console.error(error);
                reject({
                    ...error,
                    status: "ERROR",
                    code: 400
                });
                return;
            }
        }
        const getPage = async (_page) => {
            if (quality > 1.0 || quality < 0.1) {
                reject({
                    subject: "Invalid quality range",
                    description: "Please enter correct quality parametr",
                    status: "ERROR",
                    code: 400
                });
                return;
            }
            try {
                page = await docs.getPage(_page);
            } catch (error) { }
            if (page) {
                viewport = page.getViewport(1.5);
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                renderContext = {
                    canvasContext: canvas.getContext("2d"),
                    viewport
                };
                try {
                    
                    await page.render(renderContext);

                    let createData = {};

                    if(getCanvas){
                        createData['el'] = canvas;
                    }
                    if(getUrl){
                        createData['base64'] = canvas.toDataURL("image/jpeg", quality)
                    }
                
                    images.push(createData);


                } catch (error) { }
                if (i <= totalPages) {
                    i++;
                    getPage(i);
                }
                if (i == totalPages) {
                    resolve({
                        data: {
                            ...images
                        },
                        status: "SUCCESS",
                        code: 200
                    })
                }
            }
        }
        toBase64(pdf);
    });
}



export default {
    createPages,
    initDependency,
    totalPage
}