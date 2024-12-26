const canvas = document.getElementById("neonCanvas");
const ctx = canvas.getContext("2d");

let angle = 0;

// Загружаем изображение
const img = new Image();
img.src = "your-image.png"; // Убедитесь, что файл изображения находится в вашей папке и правильно назван.

// Анимация
img.onload = () => {
  const drawFrame = () => {
    // Очищаем холст
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Поворачиваем и добавляем эффект свечения
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);

    // Эффект свечения
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(255, 0, 255, 0.8)";
    ctx.drawImage(img, -img.width / 2, -img.height / 2);

    ctx.restore();

    angle += 0.5; // Скорость вращения
    requestAnimationFrame(drawFrame);
  };

  drawFrame();
};