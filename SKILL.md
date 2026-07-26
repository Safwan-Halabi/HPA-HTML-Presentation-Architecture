---
name: html-presentation-architect
description: Use when building an interactive presentation, talk, deck, or lecture as a single self-contained HTML file with plain CSS and vanilla JavaScript. Covers content density and storyboarding before code, then a scene-based runtime with keyboard navigation, audience prediction points, and spoiler-safe reveals.
version: 2.0.0
---

# HTML Presentation Architect

Build talks as one self-contained HTML file: no frameworks, no bundler, no build step, opens by
double-click. Scenes are DOM state; navigation is keyboard-first; the audience predicts before it is
told.

## The order of work — this is the skill

Most bad decks fail before any code is written, so the phases are gates, not suggestions.

1. **Content.** What are you actually saying? (See *Content density* — this is where decks die.)
2. **Storyboard.** Scene-by-scene: intent, what is on screen, what changes.
3. **Runtime.** The engine, navigation, state.
4. **Scenes.** Write them.
5. **Review.** Walk it forwards and backwards; watch it as an audience member.

**Do not write a line of code until phases 1 and 2 exist in writing.** If you skip to code, you will
build an impressive container for nothing, then spend your remaining time polishing the container.

---

## Content density — the part nobody does

The most common failure is not ugliness. It's a 5-minute talk stretched to 30 with animation.

**The test:** could the speaker deliver this in five minutes without losing anything? If yes, there
isn't a talk yet — there's a summary with decoration.

A talk feels like expertise when it contains things the audience did not already know. Aim for:

- **One surprising, verifiable thing every 2–3 minutes.** A study, a number, a case, a
  counterintuitive result. Not an opinion restated.
- **Mechanism, not just claim.** "Do X" is a tip. "Do X because of Y, which is why Z fails" is expertise.
- **Named concepts** the audience can repeat afterwards. People remember handles.
- **Concrete figures**, and only figures you have checked. One overstated number discredits the rest.
- **Multiple domains.** Evidence drawn from several fields reads as command of a subject; one domain
  reads as one anecdote.

**Honesty rule:** where a finding is contested or simplified, say so on the slide or in the notes. A
presentation that overstates its evidence loses the room the moment one person knows better.

**Cut anything that exists only to fill time.** Simulations, animated transitions and clever
interactions are the usual culprits: they feel productive to build and add no content. If an
interaction does not teach on contact, delete it.

---

## Scene design

A scene is one discrete DOM state with one job.

- **One idea per scene.** If it needs "and", split it.
- **Readable in three seconds** from the back of a room. Nine words of body copy is a good ceiling.
- **The visual is the point**, not decoration under a caption. If the words carry everything, the
  picture is wasted; if the picture needs a paragraph, it is drawn wrong.
- **Full-bleed beats boxed.** A small diagram floating above a caption strip is the weakest layout and
  the most common.
- **Big numbers big.** A single statistic at 12vw is a scene. The same statistic in a sentence is not.
- **Show before naming.** Demonstrate the thing, then title it. Naming first turns a story into a list.

### Prediction points

The highest-value interaction: make the audience commit *before* the reveal.

- Ask, run a visible countdown, take a show of hands, **then** reveal.
- The wrong answer must be genuinely tempting. If the correct answer is obvious from the setup, it is
  a quiz, not a decision, and the room will feel handled.
- Every option needs a real consequence on screen. Two options that produce the same outcome is the
  most common bug in interactive decks — check for it explicitly.

---

## Runtime

Use `template/hpa-engine.js`. It is the single source of truth for the engine; do not paste a second
implementation into your deck.

What it gives you, and why each exists:

| Feature | Why |
|---|---|
| `data-on-enter` / `data-on-exit` hooks | Scenes that animate or reset need a lifecycle, not just a class toggle |
| Input guard (`GUARD_MS`) | A presenter's reflex clicker fires twice and skips a scene, or commits an unpicked option |
| `prefers-reduced-motion` respected | Accessibility, and projectors that stutter |
| Deep-link / `goTo` safety | Jumping to a scene must render it correctly without having walked there |
| Answers kept out of the DOM | See below |

### Keys

`→` `Space` `Enter` advance · `←` back · `Home` / `End` first / last · `R` replay the current scene.

### Spoiler safety

**Never put the answer in the DOM before it is revealed.** `data-correct="true"` is visible to anyone
who opens devtools, and to anyone glancing at the presenter's screen.

- Keep answers in JS, keyed by scene id.
- For a talk with a hidden twist, encode the reveal text (e.g. base64) and decode at reveal time, and
  keep the giveaway words out of class names, ids and comments too.
- Run a literal `grep` for your secret before shipping. Assume someone will read the source.

---

## Review before you call it done

- Walk every scene **forwards, then backwards**. Zero console errors.
- Drive **every** option of every prediction point. Any that dead-ends or duplicates another is a bug.
- Check no horizontal overflow at 1280×720.
- Watch it as an audience member who knows nothing. If you can only judge it as its author, get a
  second pair of eyes — a lot of defects are invisible to the person who built them.
