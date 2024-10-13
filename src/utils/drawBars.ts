export const drawBars = (
    canvasCtx: CanvasRenderingContext2D,
    dataArray: Uint8Array,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    const bufferLength = dataArray.length;
    const barWidth = (canvasWidth / bufferLength) * 2.5;
    let barHeight: number;
    let x = 0;
    const centerY = canvasHeight* 2 / 3;
  
    canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    canvasCtx.fillStyle = 'black';  // 背景をクリア
  
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
  
      const red = barHeight + 25;
      const green = 250 - barHeight;
      const blue = 50;
  
      canvasCtx.fillStyle = `rgb(${red},${green},${blue})`;
      canvasCtx.fillRect(x, centerY - barHeight, barWidth, barHeight);
  
      x += barWidth + 1;
    }
  };
  
