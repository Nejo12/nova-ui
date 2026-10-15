---
'@nova-component/ui': patch
---

Give the bottom-navigation-item base state an explicit `background: transparent` and `border: 0` instead of leaving them unset. Previously, a consumer rendering it on a native `<button>` (a valid DOM choice the helper is agnostic to) inherited the browser's UA-default button background/border, which was never designed against consumer themes and produced a persistent color-contrast failure in at least one Dark theme (Slotnova nova-ui#348). Anchors were unaffected since they have no UA-default background/border. The current state's explicit background/foreground pairing is unchanged.
