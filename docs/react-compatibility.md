# React compatibility

Nova-UI supports React and React DOM `>=18.3.0 <20`.

DOM wrappers forward refs to their native targets: Button and IconButton to buttons; TextInput, Checkbox, Radio and SearchInput to inputs; Textarea to a textarea; Select to a select; Fieldset to a fieldset; Badge, Avatar, Spinner and VisuallyHidden to spans; Progress to a div; Icon to an SVG; Card to its selected article, section or div (typed as HTMLElement).

Dialog, Popover, Menu, Tooltip, FormField, EmptyState, InlineAlert, InlineLoading and the skeleton utilities keep their existing APIs. They do not expose native HTML prop wrappers with an unambiguous consumer ref contract; this correction does not add composite imperative APIs.

The React compatibility workflow runs focused behavior/object/callback ref tests and checks built public declarations against pinned React 18.3.1 and React 19.2.8 with corresponding type packages. Each matrix job uses a disposable checkout; dependency substitutions are never committed. The ordinary quality job remains on the lockfile's React 19 version. Native-control tests verify imperative focus, and unmount tests verify ref cleanup.
