# 🎭 HTML Presentation Architecture (HPA)

> **Death to Bullet Points.** Engineer stateful, interactive web experiences that audience members never forget.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HPA Standard](https://img.shields.io/badge/HPA-v1.0.0-emerald)](#)

HPA is a philosophy and runtime framework for creating presentations as **Single Page Applications (SPAs)** instead of static slide decks.

By leveraging modern web standards (HTML5, modern CSS Grid/Flexbox, ES6 modules), HPA allows speakers and educators to break free from linear presentation tools like PowerPoint or Keynote, enabling **interactive storytelling**, **earned reveals**, and **stateful web components**.

---

## 🌟 Key Features

* **Stateful Scenes over Static Slides:** Manage presentation scenes via DOM state and CSS transformations.
* **Interactive Primitives Built-In:** Native support for interactive flip cards, prediction/quiz blocks, dynamic accordions, and persistent global state.
* **AI-Agent Ready:** Includes a modular `SKILL.md` file designed to work natively with Cursor, Claude Code, ChatGPT, and Copilot Workspace.
* **Zero External Dependencies:** Built with pure Vanilla JS, modern CSS variables, and HTML5.

---

## 🚀 Quick Start

### 1. Using with AI Agents (Cursor / Claude / Copilot)

Copy `SKILL.md` into your project root or add it to your System Prompt / Custom Instructions:

```bash
cp SKILL.md .cursor/rules/hpa.md
```

Prompt your AI agent:
> *"I want to create an HPA experience about [Your Topic]. Please act as the HPA Architect and initiate Phase 1."*

### 2. Manual Boilerplate Setup

Clone the repository and open `template/index.html` in your browser:

```bash
git clone [https://github.com/your-username/html-presentation-architecture.git](https://github.com/your-username/html-presentation-architecture.git)
cd html-presentation-architecture/template
python3 -m http.server 8000
```

---

## 🏛 The 5-Phase HPA Pipeline

```text
[Phase 1: Architecture] ➔ [Phase 2: Interaction Map] ➔ [Phase 3: Scene Graph] 
                                                               📑
[Phase 5: SPA Implementation]  [Phase 4: Runtime Specs] 
```

1. **Architecture:** Establishing narrative and emotional arcs.
2. **Interaction Design:** Engineering audience engagement and predictions.
3. **Scene Design:** Layout blueprints, element transformations, and flow mapping.
4. **Engineering:** State management, keybindings, and runtime architecture.
5. **Implementation:** Clean HTML, CSS, and JS compilation.

---
