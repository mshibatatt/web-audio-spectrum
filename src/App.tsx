import React, { useEffect, useRef, useState } from 'react';
import { drawBars } from './utils/drawBars';
import { drawCircle } from './utils/drawCircle';

// コンポーネント
const AudioVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [visualizationType, setVisualizationType] = useState<'bars' | 'circle'>('bars');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ウィンドウサイズに応じてCanvasをリサイズする関数
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // 初回にCanvasをウィンドウサイズにリサイズ
    resizeCanvas();

    // リサイズ時にもCanvasサイズを更新
    window.addEventListener('resize', resizeCanvas);

    // マイク入力を取得
    const startAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        console.log("audit context state: ", audioContext.state); 

        // analyser設定
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        // Canvasの設定
        const canvasCtx = canvas.getContext('2d');
        if (!canvasCtx) return;


        const draw = () => {
          requestAnimationFrame(draw);

          analyser.getByteFrequencyData(dataArray);
          
          // 状態に応じて描画関数を切り替える
          if (visualizationType === 'bars') {
            drawBars(canvasCtx, dataArray, canvas.width, canvas.height);
          } else {
            drawCircle(canvasCtx, dataArray, canvas.width, canvas.height);
          }
        };

        draw();
      } catch (err) {
        console.error('マイクのアクセスに失敗しました:', err);
      }
    };

    startAudio();

    // クリーンアップ処理
    return () => {
      if (canvasRef.current) {
        const canvasCtx = canvasRef.current.getContext('2d');
        if (canvasCtx) {
          canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    };
  }, [visualizationType]);
  
  // クリックで表示を切り替える関数
  const handleCanvasClick = () => {
    setVisualizationType((prevType) => (prevType === 'bars' ? 'circle' : 'bars'));
  };


  return (
    <div>
      <canvas 
        ref={canvasRef} 
        onClick={handleCanvasClick}
        style={{ width: '100%', height: '100%', backgroundColor: 'black' }} 
      />
    </div>
  );
};

export default AudioVisualizer;