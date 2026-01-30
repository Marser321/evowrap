# Bolt's Journal

## 2025-02-23 - Critical LCP Optimization
**Learning:** The Hero section image was lazily loaded by default, negatively impacting LCP (Largest Contentful Paint).
**Action:** Added `priority` prop to `SectionBackground` component and enabled it for the Hero section to ensure eager loading.

## 2025-02-23 - Background Animation Optimization
**Learning:** Large blur filters combined with infinite animations and `mix-blend-screen` are expensive for the GPU, especially on lower-end devices.
**Action:** Optimized `BackgroundBeams` by adding `will-change-transform` to hint the browser about layer promotion, and reduced blur radii by ~25% to lower fragment shader cost.
