function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function() {
        var output = document.getElementById('imagePreview');
        output.src = reader.result;
        output.style.display = 'block';
    };
    reader.readAsDataURL(event.target.files[0]);
}

document.getElementById('resizeButton').addEventListener('click', () => {
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('imagePreview');
    const maxWidth = 400; // Max width for resizing
    const maxHeight = 300; // Max height for resizing
    let newWidth = img.width;
    let newHeight = img.height;
    if (img.width > maxWidth) {
        newWidth = maxWidth;
        newHeight = (newWidth * img.height) / img.width;
    }
    if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = (newHeight * img.width) / img.height;
    }
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    img.src = canvas.toDataURL();
});


document.getElementById('grayscaleButton').addEventListener('click', () => {
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('imagePreview');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
    }
    ctx.putImageData(imageData, 0, 0);
    img.src = canvas.toDataURL();
});

document.getElementById('blurButton').addEventListener('click', () => {
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');
    const img = document.getElementById('imagePreview');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const iterations = 3;
    for (let i = 0; i < iterations; i++) {
        ctx.filter = 'blur(2px)';
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
    }
    img.src = canvas.toDataURL();
});

document.getElementById('saveButton').addEventListener('click', () => {
    const canvas = document.getElementById('outputCanvas');
    const imgData = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'processed_image.jpg';
    link.click();
});
