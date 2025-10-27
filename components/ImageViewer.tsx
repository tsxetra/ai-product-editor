
import React from 'react';

interface ImageViewerProps {
  title: string;
  src: string | null;
  isLoading?: boolean;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ title, src, isLoading = false }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-slate-300 mb-4">{title}</h2>
      <div className="w-full aspect-square rounded-2xl bg-slate-800/50 flex items-center justify-center overflow-hidden relative border border-slate-700">
        {isLoading && (
          <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center">
            <svg className="w-12 h-12 text-sky-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        {!isLoading && !src && (
          <div className="text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {src && (
          <img src={src} alt={title} className="w-full h-full object-contain" />
        )}
      </div>
    </div>
  );
};

export default ImageViewer;
