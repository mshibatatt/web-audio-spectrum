export const drawCircle = (
    canvasCtx: CanvasRenderingContext2D,
    dataArray: Uint8Array,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    const bufferLength = dataArray.length;
    const radius = Math.min(canvasWidth, canvasHeight) / 3; // 半径を調整
  
    canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    canvasCtx.fillStyle = 'black';  // 背景をクリア
  
    // 中心点を設定
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
  
    // 円周上にデータをマッピングして描画
    for (let i = 0; i < bufferLength; i++) {
      const value = dataArray[i];
      const angle = (i / bufferLength) * Math.PI * 2; // 角度を計算
  
      const barHeight = (value / 255) * radius; // 音に基づいた棒の長さ
      const x1 = centerX + Math.cos(angle) * (radius - barHeight);
      const y1 = centerY + Math.sin(angle) * (radius - barHeight);
      const x2 = centerX + Math.cos(angle) * (radius + barHeight);
      const y2 = centerY + Math.sin(angle) * (radius + barHeight);
  
      // 描画の設定
      canvasCtx.beginPath();
      canvasCtx.moveTo(x1, y1);
      canvasCtx.lineTo(x2, y2);
      canvasCtx.strokeStyle = `rgb(${value + 100}, ${255 - value}, 150)`; // 色を調整
      canvasCtx.lineWidth = 2;
      canvasCtx.stroke();
    }
  };
