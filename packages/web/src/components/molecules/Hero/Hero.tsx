import React from 'react';
import { Button } from '@Atoms';

import './Hero.scss';

type HeroProps = {
  videoSrc: string;
  poster: string;
  ctaLabel?: string;
  headerLabel?: string;
  subtitleLabel?: string;
};

export const Hero: React.FC<HeroProps> = ({
  videoSrc,
  poster,
  ctaLabel,
  headerLabel,
  subtitleLabel,
}) => (
  <section className="Hero">
    {headerLabel && (
      <header className="Hero__header">
        <h2 className="Hero__headerTitle">{headerLabel}</h2>
        <p className="Hero__headerSubtitle">{subtitleLabel}</p>
      </header>
    )}
    <span className="Hero__cta">
      {ctaLabel && <Button label={ctaLabel} type="button" />}
    </span>
    {/* <img src={src} /> */}

    <video
      autoPlay
      muted
      loop
      style={{
        width: '100%',
      }}
      poster={poster}
    >
      <source src={videoSrc} type="video/mp4" />
      <img src={poster} title="Your browser does not support the <video> tag" />
    </video>
  </section>
);
