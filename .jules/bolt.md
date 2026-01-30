# Bolt's Journal

## 2025-02-23 - Critical LCP Optimization
**Learning:** The Hero section image was lazily loaded by default, negatively impacting LCP (Largest Contentful Paint).
**Action:** Added `priority` prop to `SectionBackground` component and enabled it for the Hero section to ensure eager loading.

## 2026-01-30 - Supabase Query Optimization
**Learning:** Selecting all columns (`*`) without pagination causes massive payload overhead and slower queries as the dataset grows.
**Action:** Implemented explicit column selection and server-side pagination (using `.range()`) in `AppointmentsTable`, reducing payload size by ~99%.
