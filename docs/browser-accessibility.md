# Browser accessibility checks

Run `pnpm typecheck:browser` and `pnpm test:browser`. Install the pinned browsers first with `pnpm exec playwright install --with-deps chromium firefox webkit`. CI runs the same bounded Playwright + axe layer separately from the ordinary quality gate.

The static fixture exercises real exported Dialog, Popover, Menu and Tooltip implementations. Ten tests per engine cover initial focus, Tab/Shift+Tab order, inert background containment, Escape, mandatory acknowledgement, action/unmount restoration, disabled controls, contenteditable and summary navigation, Popover dismissal, Menu navigation/selection, Tooltip descriptions, visible keyboard focus, and light/dark axe scans. Failure traces are retained as CI artifacts.

## Dialog focus decision

Native `dialog.showModal()` supplies modal focus navigation. Nova retains explicit initial action/cancel focus, body scroll cleanup, cancellable/non-cancellable cancel handling, and opener restoration. The custom `FOCUSABLE_SELECTOR` Tab handler is removed.

Evidence: [PR #77's initial browser run](https://github.com/Nejo12/nova-ui/actions/runs/37393154883) passed all 30 tests on Chromium 153, Firefox 155 and WebKit 26.6. That candidate run prevented only the React Tab handler from receiving Tab events, leaving native navigation enabled. It demonstrated correct navigation through contenteditable and summary elements excluded by the old selector. The final suite removes that test-only interception and tests the actual production component directly.

Native navigation can visit browser chrome between cycles; this is permitted. Containment means background page controls remain inert, including attempted programmatic focus, while dialog controls remain reachable in both directions. Nova no longer substitutes an incomplete selector for the browser's focus model. Native dialog support is required; jsdom stubs are only used for unit-level lifecycle/callback checks, not focus-navigation proof.
