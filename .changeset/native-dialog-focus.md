---
'@nova-component/ui': patch
---

Use native modal dialog Tab navigation instead of a redundant custom selector trap. Preserve initial focus, Escape/mandatory behavior, scroll cleanup and opener restoration, while allowing valid browser focusables such as contenteditable and summary. Verify Dialog, Popover, Menu and Tooltip in Chromium, Firefox and WebKit with browser accessibility tests.
