# Bolt's Journal

## 2025-02-23 - Critical LCP Optimization
**Learning:** The Hero section image was lazily loaded by default, negatively impacting LCP (Largest Contentful Paint).
**Action:** Added `priority` prop to `SectionBackground` component and enabled it for the Hero section to ensure eager loading.

## 2025-02-23 - Network Congestion Optimization in CanvasSequence
**Learning:** Loading large sequences of images using a synchronous loop causes network congestion (queueing hundreds of requests at once), delaying LCP and other critical assets.
**Action:** Implemented a concurrency-limited loader (max 6 requests) in `CanvasSequence.tsx` to batch requests, significantly improving network stability and asset loading fairness.
