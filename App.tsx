
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ImageViewer from './components/ImageViewer';
import PromptControls from './components/PromptControls';
import { editImageWithPrompt } from './services/geminiService';

function App() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const originalImageUrl = useMemo(() => {
    if (originalImage) {
      return URL.createObjectURL(originalImage);
    }
    return null;
  }, [originalImage]);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setEditedImageUrl(null);
    setError(null);
  };
  
  const handleReset = () => {
    setOriginalImage(null);
    setEditedImageUrl(null);
    setError(null);
    setIsLoading(false);
  };

  const handleGenerate = async (prompt: string) => {
    if (!originalImage) {
      setError('Please upload an image first.');
      return;
    }
    if (!prompt) {
        setError('Please enter an editing instruction.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);

    try {
      const newImageUrl = await editImageWithPrompt(originalImage, prompt);
      setEditedImageUrl(newImageUrl);
    } catch (err) {
      console.error(err);
      setError('Failed to edit image. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="w-full max-w-7xl flex-grow flex flex-col items-center">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <ImageViewer title="Before" src={originalImageUrl} />
              <ImageViewer title="After" src={editedImageUrl} isLoading={isLoading} />
            </div>
            {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-6 text-center w-full max-w-2xl">{error}</div>}
            <PromptControls onSubmit={handleGenerate} isLoading={isLoading} />
            <div className="flex items-center space-x-4 mt-6">
                <button
                  onClick={handleReset}
                  className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Start Over
                </button>
                 {editedImageUrl && !isLoading && (
                    <a
                        href={editedImageUrl}
                        download="edited-image.png"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 011.414 0L9 11.086V3a1 1 0 112 0v8.086l1.293-1.379a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Download
                    </a>
                )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
