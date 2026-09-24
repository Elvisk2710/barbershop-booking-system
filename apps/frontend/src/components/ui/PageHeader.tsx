import React from 'react';

interface PageHeaderProps {
  title: string;
  lede?: React.ReactNode;
  centered?: boolean;
  children?: React.ReactNode;
}

export function PageHeader({ title, lede, centered = false, children }: PageHeaderProps) {
  return (
    <header
      className={`shell pt-[calc(var(--nav-h)+clamp(3rem,8vw,6rem))] ${
        centered ? 'text-center' : ''
      }`}
    >
      <h1 className={`t-display text-ink ${centered ? 'mx-auto' : ''} max-w-[16ch]`}>{title}</h1>
      {lede && (
        <p className={`t-lede text-ink-2 mt-5 max-w-[40ch] ${centered ? 'mx-auto' : ''}`}>{lede}</p>
      )}
      {children}
    </header>
  );
}
