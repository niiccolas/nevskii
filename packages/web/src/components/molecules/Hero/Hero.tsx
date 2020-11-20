import React from 'react';
import { Button } from '@Atoms';

import './Hero.scss';

type HeroProps = {
  src: string;
};

export const Hero: React.FC<HeroProps> = ({ src }) => (
  <section className="Hero">
    <span className="Hero__cta">
      <Button label="CTA" />
    </span>
    <img src={src}></img>
  </section>
);
