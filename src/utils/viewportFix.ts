/**
 * Sets --app-vh CSS variable to match the visual viewport height.
 * Also forces window.scrollTo(0,0) whenever iOS tries to scroll
 * the page to reveal the focused input above the keyboard.
 */
export function installIOSViewportFix() {
  const root = document.documentElement;

  const update = () => {
    const vv = window.visualViewport;
    const height = vv ? vv.height : window.innerHeight;

    root.style.setProperty('--app-vh', `${height}px`);

    // iOS scrolls the layout viewport when the keyboard opens.
    // Force it back to the top so the page doesn't shift.
    window.scrollTo(0, 0);
  };

  update();

  window.addEventListener('resize', update);
  window.addEventListener('orientationchange', update);

  window.visualViewport?.addEventListener('resize', update);
  window.visualViewport?.addEventListener('scroll', update);
}
