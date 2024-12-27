const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

upload.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      applyNeonEffect();
    };
    img.src = URL.createObjectURL(file);
  }
});

function applyNeonEffect() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

    // Убираем фон, оставляем только яркие области
    if (avg > 100) {
      data[i] = 0;      // Красный
      data[i + 1] = 255; // Зеленый
      data[i + 2] = 255; // Синий
    } else {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 0; // Прозрачность
    }
  }

  ctx.putImageData(imageData, 0, 0);

  // Добавление анимации через CSS
  canvas.style.filter = "drop-shadow(0 0 20px cyan)";
  setInterval(() => {
    canvas.style.filter = canvas.style.filter === "drop-shadow(0 0 20px cyan)"
      ? "drop-shadow(0 0 20px magenta)"
      : "drop-shadow(0 0 20px cyan)";
  }, 500);
}

// Скачивание изображения
document.getElementById('download').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'neon-effect.png';
  link.href = canvas.toDataURL();
  link.click();
});