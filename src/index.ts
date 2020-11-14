(function (window, document) {
    // It appears as if the document is only partially rendered based on what
    // is visible in the viewport.
    // The images in the google doc are embedded within SVGs for some reason.
    const images = Array.from(document.querySelectorAll('image'));

    const loadImage = (url: string) => {
        return new Promise<Blob | null>(resolve => {
            const image = new Image();
            image.onload = () => {
                imageToBlob(image)
                    .then(resolve);
            };
            image.src = url;
        });
    };

    const imageToBlob = (image: HTMLImageElement) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        if (context) {
            context.drawImage(image, 0, 0);
        }
        return new Promise<Blob | null>((resolve) => {
            canvas.toBlob(resolve);
        });
    };

    const downloadBlob = (blob: Blob, filename: string) => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = filename + '.png';
        link.click();
        window.URL.revokeObjectURL(url);
    };

    const createOnClick = (src: string) => {
        return (event: MouseEvent) => {
            event.stopPropagation();
            const message = 'What would you like to name this image?';
            const filename = window.prompt(message, 'image');
            if (filename) {
                loadImage(src)
                    .then(blob => blob && downloadBlob(blob, filename));
            }
            cleanUp();
        };
    };

    const createButton = () => {
        const button = document.createElement('button');
        button.innerText = '💾';
        button.title = 'Download image';
        const s = button.style;
        s.position = 'absolute';
        s.transform = 'translate(-100%, -10px)';
        s.background = 'none';
        s.border = '0';
        s.fontSize = '24px';
        s.padding = '10px';
        s.cursor = 'pointer';
        s.filter = 'hue-rotate(270deg)';
        return button;
    };

    const addDownloadImageButton = (image: SVGImageElement) => {
        const button = createButton();
        button.onclick = createOnClick(image.href.baseVal);
        // Traverse a couple of elements up to ensure that the button is not
        // within the overflow hidden container.
        image.closest('svg')?.parentNode?.parentNode?.appendChild(button);
        return button;
    };

    const buttons = images.map(addDownloadImageButton);

    // Remove the buttons that were appended. I'd rather clean up than assume
    // that people intend to download multiple images. Besides, executing the
    // bookmarklet will only add buttons for the images that are within the
    // partially rendered document within the viewport
    const cleanUp = () => {
        buttons.forEach(button => button?.parentNode?.removeChild(button));
    };
}(window, document));
