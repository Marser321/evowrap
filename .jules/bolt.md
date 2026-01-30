# Bolt's Journal

## 2025-02-23 - Critical LCP Optimization
**Learning:** The Hero section image was lazily loaded by default, negatively impacting LCP (Largest Contentful Paint).
**Action:** Added `priority` prop to `SectionBackground` component and enabled it for the Hero section to ensure eager loading.
**Learning:**  relies on  and external API calls (Nominatim). These are asynchronous and can be slow or fail. **Action:** Ensure UI implementations using this function implement proper loading states and do not block the main thread or critical rendering path.
**Learning:** `detectLocation` relies on `navigator.geolocation` and external API calls (Nominatim). These are asynchronous and can be slow or fail. **Action:** Ensure UI implementations using this function implement proper loading states and do not block the main thread or critical rendering path.
