
import { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleParse = async () => {
    setLoading(true);
    setError('');
    setOutput('');
    try {
      const res = await fetch('http://localhost:3001/fuzzy-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ json: input })
      });
      const data = await res.json();
      if (data.result) {
        setOutput(JSON.stringify(data.result, null, 2));
      } else {
        setError(data.error || 'Unknown error');
      }
    } catch (err) {
      setError('Failed to connect to API');
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Header Bar */}
      <div className="header-bar">
        <span className="header-title">Fuzzy JSON Parser</span>
      </div>

      {/* Centered Logo and Title */}
      <div className="main-title">
        <img className="main-title-logo" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4dd.svg" alt="Logo" />
        <span className="main-title-text">Fuzzy JSON Parser</span>
      </div>

      {/* Split Panels */}
      <div className="modern-split">
        <div className="modern-panel">
          <label className="modern-label" htmlFor="json-input">Input</label>
          <div className="custom-input-wrapper">
            <textarea
              id="json-input"
              className="custom-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Paste or type your (even broken) JSON here..."
              spellCheck={false}
              autoFocus
            />
          </div>
        </div>
        <div className="modern-panel">
          <label className="modern-label" htmlFor="json-output">Translation</label>
          <div className="custom-input-wrapper">
            <textarea
              id="json-output"
              className="custom-input"
              value={output}
              readOnly
              placeholder="Parsed JSON will appear here..."
              spellCheck={false}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <button
          className="modern-btn"
          onClick={handleParse}
          disabled={loading || !input.trim()}
        >
          {loading ? 'Parsing...' : 'Fuzzy Parse'}
        </button>
        {error && <div className="modern-error">{error}</div>}
      </div>

      <footer className="modern-footer">
        &copy; {new Date().getFullYear()} Made With ❤️ by SySDeV
      </footer>

    </div>
  );
}

export default App;
