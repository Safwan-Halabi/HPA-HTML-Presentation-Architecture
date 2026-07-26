# HPA Guidelines

Detail behind `SKILL.md`. Read that first.

## Vocabulary

One rename, because it changes how you think: **scene**, not slide. A slide is a page you turn; a scene
is a state the deck is in, and states can be entered, exited, replayed and deep-linked.

Everything else keeps its ordinary name. Renaming clicks to "interactions" and bullets to "beats" costs
effort and buys nothing.

## The five phases

| Phase | Output | Gate before moving on |
|---|---|---|
| 1. Content | The claims, the evidence, the sources | Could this be delivered in 5 minutes with nothing lost? If yes, stop. |
| 2. Storyboard | Scene list: intent, what's on screen, what changes | Does every scene have exactly one job? |
| 3. Runtime | Engine, keys, state, hooks | Can you jump to any scene and have it render correctly? |
| 4. Scenes | The HTML | Nine words of body copy or fewer, per scene |
| 5. Review | Forward + backward walk, every option driven | Zero console errors, no duplicate outcomes |

## Layout patterns that work

- **Statement** — one sentence, large, optically centred slightly above middle. The workhorse.
- **Stat** — one number at 10–14vw, a short label beneath, a source line in mono. Use for the figure
  you most want repeated afterwards.
- **Evidence card** — mono eyebrow naming the source, the claim as a headline, two lines of mechanism.
  This is what makes a deck read as researched rather than opinionated.
- **Strike list** — wrong answers appearing and being struck through in rhythm. Teaches that the talk
  removes things, and it is a genuinely satisfying pattern to watch.
- **Composed diagram** — full-bleed, labels placed *in* the space rather than in a caption below.
- **Prediction point** — the setup, a countdown, options placed where the choice leads, then the reveal.

## Layout patterns that fail

- A small diagram centred above a caption strip. The most common and the weakest.
- Bulleted lists of more than three items; nobody reads item four.
- A paragraph. If a scene needs a paragraph, it is two scenes or it is speaker notes.
- Decorative motion. If removing an animation loses nothing, it was noise.

## Composed frames, not simulation

If you need to show something happening, author **2–4 composed states and cut between them** rather
than building a real-time simulator.

A simulation has to be correct in every frame — units moving plausibly, nothing overlapping wrongly —
which is unbounded work with no natural finish line, and it will consume a project. A composed frame
has to be correct **once**, and you can make it beautiful. Comic panels, not physics.

## Accessibility floor

Respect `prefers-reduced-motion`. Keep contrast high enough for a washed-out projector. Make every
interaction reachable from the keyboard — never require a mouse, because presenters use clickers.
Do not encode meaning in colour alone.

## Shipping checklist

- [ ] One file, opens by double-click, works with the network off
- [ ] Forward and backward walk: zero console errors
- [ ] Every prediction option driven; none dead-ends or duplicates another
- [ ] No horizontal overflow at 1280×720
- [ ] Any secret grepped for and absent from copy, classes, ids and comments
- [ ] Every number on a slide checked against its source
