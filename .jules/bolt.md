# Bolt's Journal

## 2025-02-23 - Critical LCP Optimization
**Learning:** The Hero section image was lazily loaded by default, negatively impacting LCP (Largest Contentful Paint).
**Action:** Added `priority` prop to `SectionBackground` component and enabled it for the Hero section to ensure eager loading.

## 2025-02-23 - Global Event Listener Optimization
**Learning:** Global `mousemove` listeners attached unconditionally cause unnecessary CPU load when the interactive component is off-screen.
**Action:** Refactored `HeroBackground` to use `IntersectionObserver`, ensuring event listeners are only active when the component is in the viewport.
