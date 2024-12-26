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
    // Пример настройки цветов для неонового эффекта
    data[i] = data[i] * 2;     // Красный
    data[i + 1] = data[i + 1] * 0.5; // Зеленый
    data[i + 2] = data[i + 2] * 2;   // Синий
  }

  ctx.putImageData(imageData, 0, 0);

  // Анимация
  canvas.style.filter = "drop-shadow(0 0 10px cyan)";
  setInterval(() => {
    canvas.style.filter = canvas.style.filter === "drop-shadow(0 0 10px cyan)"
      ? "drop-shadow(0 0 10px magenta)"
      : "drop-shadow(0 0 10px cyan)";
  }, 500);
}

// Функция скачивания
document.getElementById('download').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'neon-effect.png';
  link.href = canvas.toDataURL();
  link.click();
});