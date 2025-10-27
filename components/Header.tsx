
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-7xl mb-8 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-cyan-300 text-transparent bg-clip-text">
        AI Product Photo Editor
      </h1>
      <p className="mt-3 text-lg text-slate-400 max-w-3xl mx-auto">
        Upload a photo and use simple text instructions to remove backgrounds, apply filters, and more.
      </p>
    </header>
  );
};

export default Header;
