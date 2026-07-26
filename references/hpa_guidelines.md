# HPA Guidelines & Core Specifications

## Vocabulary & Terminology Guardrails
You must strictly replace traditional presentation terminology with HPA Architecture vocabulary across all phases[cite: 7]:

| Deprecated Term | Mandatory HPA Term | Definition |
| :--- | :--- | :--- |
| Slide | **Scene** | A discrete DOM state representing a single focus area[cite: 7]. |
| Bullet Point | **Beat** | An atomic piece of information or argument within a scene[cite: 7]. |
| Transition | **Flow** | The directional, contextual shift from one scene to another[cite: 7]. |
| Animation | **Transformation** | Morphing elements to show state changes or continuity[cite: 7]. |
| Click | **Interaction** | An intentionally designed audience or presenter input event[cite: 7]. |
| Presentation | **Experience** | The complete interactive web application[cite: 7]. |
| Section | **Act** | A higher-level thematic block containing multiple scenes[cite: 7]. |
| Speaker Notes | **Performance Script**| Guidance for the presenter's delivery and trigger timing[cite: 7]. |

## The 5-Phase Execution Pipeline
1. **Phase 1: Presentation Architecture:** Define Core Purpose, Target Audience, Ultimate Takeaway, 3-Act Narrative Structure, and Emotional Arc[cite: 7].
2. **Phase 2: Experience Design:** Design the Interaction Map, prediction/quiz points, and visual rhythm[cite: 7].
3. **Phase 3: Scene Design:** Produce a complete Scene Graph mapping scene IDs (`scene-1`, `scene-2`, etc.) and interactive UI primitives[cite: 7].
4. **Phase 4: Runtime Engineering:** Define global state requirements, navigation keybindings (`ArrowRight`, `ArrowLeft`, `Enter`), and transition timings[cite: 7].
5. **Phase 5: Implementation:** Write production-ready HTML5, CSS3, and JavaScript conforming to HPA standards[cite: 7].
