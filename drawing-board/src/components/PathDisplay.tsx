import React from 'react';
import './PathDisplay.css';

interface Point {
  x: number;
  y: number;
}

interface PathDisplayProps {
  path: Point[];
  onSendToBoard: () => void;
  isLoading: boolean;
  status: string;
}

const PathDisplay: React.FC<PathDisplayProps> = ({ path, onSendToBoard, isLoading, status }) => {
  return (
    <div className="path-display-container">
      <div className="path-header">
        <h3>描画パス情報</h3>
        <div className="path-controls">
          <button 
            onClick={onSendToBoard} 
            disabled={path.length === 0 || isLoading}
            className="send-button"
          >
            {isLoading ? '送信中...' : 'ボードに送信'}
          </button>
        </div>
      </div>
      
      <div className="status-display">
        <span className={`status ${status.toLowerCase()}`}>
          ステータス: {status}
        </span>
      </div>

      <div className="path-info">
        <p>座標点数: {path.length}点</p>
        {path.length > 0 && (
          <>
            <p>開始点: ({Math.round(path[0].x)}, {Math.round(path[0].y)})</p>
            <p>終了点: ({Math.round(path[path.length - 1].x)}, {Math.round(path[path.length - 1].y)})</p>
          </>
        )}
      </div>

      {path.length > 0 && (
        <div className="path-coordinates">
          <h4>座標データ（最初の10点）:</h4>
          <div className="coordinates-list">
            {path.slice(0, 10).map((point, index) => (
              <div key={index} className="coordinate-item">
                [{index + 1}] ({Math.round(point.x)}, {Math.round(point.y)})
              </div>
            ))}
            {path.length > 10 && (
              <div className="coordinate-item">...他 {path.length - 10} 点</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PathDisplay;