import React from 'react';
import { ScrollLitText } from '@/components/motion/ScrollLitText';

export function Statement() {
  return (
    <section className="section bg-paper">
      <div className="shell">
        <ScrollLitText
          as="h2"
          className="t-title text-ink max-w-[22ch]"
          text="We opened in 2018 with one rule: nobody waits. You book a time, the chair is ready, and your barber gives you the full hour — not whatever is left between walk-ins."
        />
      </div>
    </section>
  );
}
