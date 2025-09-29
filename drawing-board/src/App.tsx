import React, { useState } from 'react';
import DrawingCanvas from './components/DrawingCanvas';
import PathDisplay from './components/PathDisplay';
import './App.css';

interface Point {
  x: number;
  y: number;
}

function App() {
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('待機中');

  const handlePathComplete = (path: Point[]) => {
    setCurrentPath(path);
    setStatus('パス作成完了');
  };

  const handleSendToBoard = async () => {
    if (currentPath.length === 0) return;

    setIsLoading(true);
    setStatus('送信中');

    try {
      // 環境変数からAPI URLを取得
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      
      // バックエンドAPIにパスデータを送信
      const response = await fetch(`${apiUrl}/api/path`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          path: currentPath,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setStatus('送信完了');
        console.log('Path sent successfully:', result);
      } else {
        setStatus('送信エラー');
        console.error('Failed to send path');
      }
    } catch (error) {
      setStatus('接続エラー');
      console.error('Network error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>組み込みボード制御システム</h1>
        <p>線を描いてボードの動作パスを指定できます</p>
      </header>
      <main className="App-main">
        <div className="app-content">
          <div className="canvas-section">
            <DrawingCanvas onPathComplete={handlePathComplete} />
          </div>
          <div className="info-section">
            <PathDisplay
              path={currentPath}
              onSendToBoard={handleSendToBoard}
              isLoading={isLoading}
              status={status}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
