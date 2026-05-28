import { useState, useEffect } from 'react';
import { Download, DetectPlatform, CheckDependencies } from '../wailsjs/go/main/App';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('');
  const [audioOnly, setAudioOnly] = useState(false);
  const [quality, setQuality] = useState('best');
  const [status, setStatus] = useState<'idle' | 'downloading' | 'done' | 'error'>('idle');
  const [result, setResult] = useState('');
  const [depsOk, setDepsOk] = useState(true);

  useEffect(() => {
    CheckDependencies().then((deps: Record<string, boolean>) => {
      if (!deps['yt-dlp'] || !deps['ffmpeg']) {
        setDepsOk(false);
      }
    });
  }, []);

  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrl(val);
    if (val.length > 10) {
      const p = await DetectPlatform(val);
      setPlatform(p);
    } else {
      setPlatform('');
    }
  };

  const handleDownload = async () => {
    if (!url) return;
    setStatus('downloading');
    setResult('');
    try {
      const res = await Download({
        url,
        audioOnly,
        quality,
        outputDir: '',
      });
      if (res.success) {
        setStatus('done');
        setResult(res.filename);
      } else {
        setStatus('error');
        setResult(res.error);
      }
    } catch (err: any) {
      setStatus('error');
      setResult(err.toString());
    }
  };

  if (!depsOk) {
    return (
      <div className="app">
        <div className="container">
          <h1 className="title">🎬 Snag</h1>
          <div className="warning">
            <p>⚠️ Missing dependencies</p>
            <p className="dim">Install yt-dlp and ffmpeg to use Snag:</p>
            <code>brew install yt-dlp ffmpeg</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">🎬 Snag</h1>
        <p className="subtitle">Grab media from anywhere</p>

        <div className="input-group">
          <input
            type="text"
            className="url-input"
            placeholder="Paste your URL here..."
            value={url}
            onChange={handleUrlChange}
            disabled={status === 'downloading'}
          />
          {platform && <span className="platform-badge">{platform}</span>}
        </div>

        <div className="options">
          <div className="option-row">
            <label className="option-label">Type</label>
            <div className="toggle-group">
              <button
                className={`toggle-btn ${!audioOnly ? 'active' : ''}`}
                onClick={() => setAudioOnly(false)}
                disabled={status === 'downloading'}
              >
                🎥 Video
              </button>
              <button
                className={`toggle-btn ${audioOnly ? 'active' : ''}`}
                onClick={() => setAudioOnly(true)}
                disabled={status === 'downloading'}
              >
                🎵 Audio
              </button>
            </div>
          </div>

          {!audioOnly && (
            <div className="option-row">
              <label className="option-label">Quality</label>
              <div className="toggle-group">
                {['best', '1080', '720', '480', '360'].map((q) => (
                  <button
                    key={q}
                    className={`toggle-btn ${quality === q ? 'active' : ''}`}
                    onClick={() => setQuality(q)}
                    disabled={status === 'downloading'}
                  >
                    {q === 'best' ? '🔥 Best' : `${q}p`}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          className="download-btn"
          onClick={handleDownload}
          disabled={!url || status === 'downloading'}
        >
          {status === 'downloading' ? '⏳ Downloading...' : '📥 Download'}
        </button>

        {status === 'done' && (
          <div className="result success">
            <p>✅ Download complete!</p>
            <p className="filename">{result}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="result error">
            <p>❌ Download failed</p>
            <p className="filename">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;