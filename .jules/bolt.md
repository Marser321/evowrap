# Bolt's Journal

## 2025-02-23 - Critical LCP Optimization
**Learning:** The Hero section image was lazily loaded by default, negatively impacting LCP (Largest Contentful Paint).
**Action:** Added `priority` prop to `SectionBackground` component and enabled it for the Hero section to ensure eager loading.

## 2025-02-23 - Below-Fold Image Optimization
**Learning:** The `BeforeAfterSlider` component was forcing `priority={true}` on its images, even when used below the fold. This caused bandwidth contention with critical above-the-fold assets, potentially delaying LCP and TTI.
**Action:** Removed hardcoded `priority` and made it an optional prop (defaulting to `false`) to allow browser-native lazy loading for non-critical instances.
