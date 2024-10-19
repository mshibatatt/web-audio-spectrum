export const generateRandomData = (dataArray: Uint8Array, maxRandomFactor: number): Uint8Array => {
    const randomData = new Uint8Array(dataArray.length);
    
    var amplitude = 0;
    for (let i = 0; i < dataArray.length; i++) {
        amplitude += dataArray[i];
    }
    amplitude /= dataArray.length;
    const randomFactor = (amplitude / 255) * maxRandomFactor; // 振幅に応じた乱数範囲を設定
    for (let i = 0; i < dataArray.length; i++) {
      randomData[i] = Math.random() * randomFactor; // 振幅に基づいた乱数を生成
    }
    
    return randomData;
  };
  