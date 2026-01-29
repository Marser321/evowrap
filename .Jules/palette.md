## 2024-05-22 - Handling Large AI Assets & Visual verification
**Learning:** Users may provide raw, unoptimized AI generation outputs (e.g., 6MB+ PNGs) as assets. Relying on `next/image` is critical for performance in these cases to avoid shipping massive payloads to clients.
**Action:** Always check file sizes of provided assets and enforce `next/image` usage or preprocessing.

**Learning:** "Checkerboard background" confusion. Users may confuse transparency with the visual checkerboard representation.
**Action:** When users ask "did you remove the background?", visually verify the asset against a contrasting background (using a temp page if needed) to ensure alpha channel is correct and not baked-in pixels.
