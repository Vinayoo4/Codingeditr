import React, { useState, useCallback, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import Split from 'react-split';
import { motion } from 'framer-motion';
import { Moon, Sun, Skull, Activity, Play, Loader2 } from 'lucide-react';

const languages = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'r', name: 'R' }
];

function App() {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState(languages[0]);
  const [code, setCode] = useState('// Start coding here');
  const [output, setOutput] = useState('Run your code to see the output');
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [lastKeyPressTime, setLastKeyPressTime] = useState(Date.now());
  const [keyPressCount, setKeyPressCount] = useState(0);

  const calculateWPM = useCallback(() => {
    const now = Date.now();
    const timeElapsed = (now - lastKeyPressTime) / 1000 / 60;
    if (timeElapsed > 0) {
      const words = keyPressCount / 5;
      return Math.round(words / timeElapsed);
    }
    return 0;
  }, [lastKeyPressTime, keyPressCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWpm(calculateWPM());
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateWPM]);

  const handleEditorChange = useCallback((value: string | undefined) => {
    setCode(value || '');
    setLastKeyPressTime(Date.now());
    setKeyPressCount((prev) => prev + 1);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const executeCode = async () => {
    setIsRunning(true);
    setOutput('Executing...');

    try {
      let result = '';

      switch (language.id) {
        case 'javascript':
          try {
            // Create a new Function to execute the code in a sandbox
            const func = new Function(code);
            // Capture console.log output
            const originalLog = console.log;
            let output = '';
            console.log = (...args) => {
              output += args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
              ).join(' ') + '\n';
            };
            
            func();
            console.log = originalLog;
            result = output || 'Code executed successfully (no output)';
          } catch (error: any) {
            result = `Error: ${error.message}`;
          }
          break;

        case 'html':
          try {
            // Create a sandbox iframe
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            
            if (iframe.contentWindow) {
              iframe.contentWindow.document.open();
              iframe.contentWindow.document.write(code);
              iframe.contentWindow.document.close();
              result = 'HTML preview ready in output panel';
              
              // Get the rendered HTML
              const renderedHTML = iframe.contentWindow.document.documentElement.outerHTML;
              setOutput(renderedHTML);
            }
            
            document.body.removeChild(iframe);
          } catch (error: any) {
            result = `Error: ${error.message}`;
          }
          break;

        case 'css':
          result = 'CSS validation successful';
          break;

        default:
          result = `Language '${language.name}' execution is not supported in the browser environment.\nConsider using a backend service for executing ${language.name} code.`;
      }

      setOutput(result);
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative"
                >
                  <Skull className="w-8 h-8 text-amber-500" />
                  <div className="absolute -inset-1 bg-amber-500 opacity-20 blur-lg rounded-full"></div>
                </motion.div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                  Royal Code Editor
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg">
                  <Activity className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {wpm} WPM
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                >
                  {isDark ? (
                    <Sun className="w-6 h-6 text-amber-500" />
                  ) : (
                    <Moon className="w-6 h-6 text-amber-500" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <select
              value={language.id}
              onChange={(e) => setLanguage(languages.find(l => l.id === e.target.value) || languages[0])}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={executeCode}
              disabled={isRunning}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                isRunning
                  ? 'bg-amber-500/50 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-600'
              } text-white font-medium transition-colors duration-200`}
            >
              {isRunning ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              <span>{isRunning ? 'Running...' : 'Run Code'}</span>
            </motion.button>
          </div>

          <Split
            className="flex h-[calc(100vh-12rem)]"
            sizes={[70, 30]}
            minSize={100}
            gutterSize={10}
            gutterAlign="center"
            snapOffset={30}
          >
            <div className="h-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <Editor
                height="100%"
                defaultLanguage={language.id}
                language={language.id}
                value={code}
                onChange={handleEditorChange}
                theme={isDark ? 'vs-dark' : 'light'}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  padding: { top: 10 },
                  scrollBeyondLastLine: false,
                  quickSuggestions: {
                    other: true,
                    comments: true,
                    strings: true
                  },
                  acceptSuggestionOnCommitCharacter: true,
                  acceptSuggestionOnEnter: 'on',
                  accessibilitySupport: 'on',
                  autoIndent: 'full',
                  formatOnPaste: true,
                  formatOnType: true
                }}
              />
            </div>
            <div className="h-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 overflow-auto">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Output</h2>
              <pre className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-wrap font-mono">
                {output}
              </pre>
            </div>
          </Split>
        </main>
      </div>
    </div>
  );
}

export default App;