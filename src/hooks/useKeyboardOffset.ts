import { useState, useEffect } from 'react';

/**
 * Returns the pixel offset of the iOS/Android virtual keyboard.
 * Uses the Visual Viewport API to detect when the keyboard shrinks the visible area.
 * Returns 0 when the keyboard is closed or on desktop.
 */
export function useKeyboardOffset(): number {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    function update() {
      const vv = window.visualViewport;
      if (!vv) return;
      // The difference between the layout viewport and the visual viewport
      // is how much the keyboard is covering
      const keyboardHeight = window.innerHeight - vv.height - vv.offsetTop;
      setOffset(Math.max(0, keyboardHeight));
    }

    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
    };
  }, []);

  return offset;
}
