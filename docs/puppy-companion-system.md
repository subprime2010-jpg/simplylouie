# SimplyLouie Puppy Companion System

---

## Documentation Index

### 0. Overview
- Purpose of the Puppy Companion
- Emotional philosophy
- High-level architecture

### 1. Core Systems
- 1.1 Progress Points (PP) System
- 1.2 Stage Thresholds (1–4)
- 1.3 Growth Reveal Logic
- 1.4 Encouragement Message Engine
- 1.5 Idle + Celebration Animations

### 2. Visual & Emotional Design
- 2.1 Art Direction Guide
- 2.2 Stage-by-Stage Visual Rules
- 2.3 Animation Style Guide
- 2.4 Emotional Tone Principles

### 3. UI & Interaction
- 3.1 Avatar Placement & Behavior
- 3.2 Profile Card Layout
- 3.3 Modal Interaction Rules
- 3.4 Daily Presence System

### 4. Onboarding & Milestones
- 4.1 Puppy Onboarding Sequence
- 4.2 Milestone Moments
- 4.3 Daily Presence Logic
- 4.4 Memory Moments

### 5. Personalization Layer
- 5.1 Naming Rules
- 5.2 Accent Color Options
- 5.3 Tone Selection
- 5.4 Accessibility Options

### 6. Asset Production
- 6.1 Asset List (All Stages)
- 6.2 File Naming Rules
- 6.3 Folder Structure
- 6.4 Animation Frame Requirements

### 7. Logic & API
- 7.1 PuppyState Object
- 7.2 API Endpoints
- 7.3 State Persistence
- 7.4 Error Handling Rules

### 8. QA & Testing
- 8.1 Initialization Tests
- 8.2 Stage Logic Tests
- 8.3 Animation Tests
- 8.4 Message System Tests
- 8.5 Personalization Tests
- 8.6 Memory Tests
- 8.7 Cross-Device Sync Tests
- 8.8 Emotional Integrity Tests

### 9. Launch Readiness
- 9.1 Launch Checklist
- 9.2 Go/No-Go Criteria
- 9.3 Post-Launch Monitoring
- 9.4 Regression Prevention

### 10. Roadmap
- 10.1 Phase 1 — Core Companion
- 10.2 Phase 2 — Emotional Depth
- 10.3 Phase 3 — Companion Skills
- 10.4 Phase 4 — Environmental Awareness
- 10.5 Phase 5 — Companion Evolution
- 10.6 Phase 6 — Community Presence
- 10.7 Phase 7 — Legacy Mode

### Appendices
- A. Message Library (All Stages + Tones)
- B. Animation Reference Sheets
- C. Asset Previews (Static)
- D. Localization Notes (Global-Friendly Language)
- E. Accessibility Guidelines
- F. Emotional Safety Rules
- G. Failure Modes & Recovery Protocol
- H. Performance Budget
- I. Telemetry & Privacy Rules
- J. Launch Checklist
- K. Post-Launch Monitoring Rules
- L. Marketing Positioning
- M. Launch Announcement
- N. Error & Edge-Case UI
- O. Localization Rules
- P. QA Test Matrix
- Q. Launch-Day Stability Protocol
- R. Long-Term Evolution Roadmap
- S. Full System Specification (Consolidated)
- T. Engineering Implementation Plan
- U. API Monetization Blueprint
- V. Developer Documentation Structure
- W. SDK Architecture
- X. Revenue Model — Full Stack
- Y. Ghost Protocol Manifesto
- Z. LOUIE Origin Story — Public Version

---

## Overview

The puppy companion is a visual representation of user growth. It evolves as the user progresses, creating an emotional connection tied to real achievement — not gamification tricks.

**Core Principle:** The puppy grows because you're growing — not because the app wants "engagement."

---

## Growth Stages

### Stage 1: The New Pup
Small, unsure, but full of potential. This is the moment you decide to start, even if everything feels new and a little overwhelming. The pup is a reflection of that first brave step.

### Stage 2: The Learner
Curious, growing, and beginning to trust the process. You're showing up, trying things, and proving to yourself that you can learn anything with the right support.

### Stage 3: The Companion
Steady, loyal, and present. The pup is now a real part of your journey — a reminder that you're not doing this alone, and that your effort is building something real.

### Stage 4: The Guardian
Strong, confident, and protective. This stage represents the version of you that knows your value, uses your tools with intention, and refuses to go back to feeling powerless.

---

## XP System (Progress Points)

### PP Actions
| Action | Points |
|--------|--------|
| Asking a question | +1 PP |
| Completing a task or following a suggestion | +2 PP |
| Learning something new (tutorials, explanations, summaries) | +3 PP |
| Finishing a multi-step workflow | +5 PP |
| Daily streak (using SimplyLouie two days in a row) | +10 PP |

### Growth Thresholds
| Transition | Points Required |
|------------|-----------------|
| Stage 1 → Stage 2 | 20 PP |
| Stage 2 → Stage 3 | 60 PP |
| Stage 3 → Stage 4 | 150 PP |

### Rules
- No penalties. The puppy never shrinks.
- Growth is slow enough to feel earned, fast enough to feel alive.
- Every stage unlocks a new expression or animation.
- Growth is tied to consistency, not perfection.

---

## Expressions & Animations

### Stage 1: The New Pup
- **Expression:** Wide-eyed, cautious, curious.
- **Animation:** Small head tilt, tiny ear twitch.
- **Emotional meaning:** "I'm new here… but I'm ready if you are."

### Stage 2: The Learner
- **Expression:** Brighter eyes, slight smile, more confident posture.
- **Animation:** Small bounce, tail wag, playful hop.
- **Emotional meaning:** "We're figuring this out together."

### Stage 3: The Companion
- **Expression:** Warm eyes, steady stance, loyal presence.
- **Animation:** Slow tail wag, gentle nod, soft breathing motion.
- **Emotional meaning:** "I'm here. You're not doing this alone."

### Stage 4: The Guardian
- **Expression:** Strong, calm, protective.
- **Animation:** Subtle chest rise, grounded stance, slow confident tail sweep.
- **Emotional meaning:** "You've grown. I'm proud of you. Let's keep going."

### Behavior Rules
- Animations are subtle, never distracting.
- Expressions change only when the user earns PP or completes a meaningful action.
- The puppy never shows negative emotions — only growth, support, and presence.
- Every stage feels like a natural evolution, not a reward screen.

**Emotional Principle:** The puppy reacts to your progress the way a real rescue would — with trust, loyalty, and quiet pride.

---

## UI Placement & Interaction

### Primary Placement
- Bottom-right corner of the screen.
- Circular avatar container (60–80px on mobile, 90–110px on desktop).
- Always visible but never blocking text or buttons.

### Idle Behavior
- The puppy gently idles (subtle breathing animation).
- When the user earns PP, the puppy performs a small "celebration" animation.

### Tap/Click Modal
When tapped/clicked, the puppy opens a small modal with:
- Current stage
- Progress Points (PP)
- Next milestone
- A short encouraging message

### Modal Design
- Clean, simple card with rounded corners.
- Puppy image at the top.
- Progress bar underneath (soft blue).
- Text is short, warm, and supportive.

### Interaction Rules
- The puppy never interrupts the user.
- No pop-ups, no nags, no notifications.
- The puppy reacts only when the user makes progress.
- The modal closes with a single tap/click outside the card.

**Emotional Principle:** The puppy is a quiet companion — always there, never demanding attention, always proud of the user's progress.

---

## Growth Reveal Moments

### Trigger
A Growth Reveal triggers instantly when the user crosses a stage threshold (20 PP, 60 PP, 150 PP).

### Reveal Format
- Screen gently dims (20% opacity).
- Puppy avatar enlarges to center of screen (1.4x size).
- Soft glow behind the puppy (subtle blue or warm gold).
- 1–2 second animation unique to the new stage.

### Stage-Up Animations

**Stage 1 → Stage 2:**
- Small hop + excited tail wag.
- Emotional meaning: "You're learning. I'm proud of you."

**Stage 2 → Stage 3:**
- Calm step forward + warm gaze.
- Emotional meaning: "We're in this together now."

**Stage 3 → Stage 4:**
- Strong, grounded stance + slow confident tail sweep.
- Emotional meaning: "You've become someone powerful."

### Text Overlay (always short)
- "You grew."
- "Your consistency is paying off."
- "Look how far you've come."

### Dismissal
- User taps anywhere to close.
- Puppy returns to bottom-right corner at new stage size.

### Rules
- No sound (global-friendly).
- No confetti, no childish effects.
- Reveal lasts 2–3 seconds max.
- Always emotional, never gamified.

**Emotional Principle:** The reveal should feel like a quiet moment of pride — not a video game reward.

---

## Encouragement Message System

### Trigger
A message appears only when the user earns PP (Progress Points) or completes a meaningful action.

### Format
- Short, 1–2 lines max.
- Warm, supportive, never pushy.
- Appears above the puppy for 2.5 seconds, then fades out.

### Messages by Stage

**Stage 1: The New Pup**
- "Starting is the hardest part. You did it."
- "I'm right here with you."
- "Small steps count."

**Stage 2: The Learner**
- "You're getting the hang of this."
- "Look at you showing up."
- "Every bit of effort matters."

**Stage 3: The Companion**
- "You're building something real."
- "I'm proud of your consistency."
- "You're not doing this alone."

**Stage 4: The Guardian**
- "You've grown so much."
- "Your progress is showing."
- "You're becoming unstoppable."

### Rules
- No repetition within a session.
- No negative or corrective messages.
- No pressure, no streak shaming.
- Messages always reinforce identity and progress.

**Emotional Principle:** The puppy speaks the way a real rescue learns to trust — quietly, gently, and with genuine pride.

---

## Puppy Profile Card

### Access
- Opens when the user taps/clicks the puppy avatar.
- Closes when the user taps outside the card.

### Layout
- Centered modal card (mobile + desktop).
- Rounded corners, soft shadow, warm neutral background.
- Puppy image at the top (current stage version).

### Sections

**1. Stage Display**
- Large text: "Stage: The New Pup / The Learner / The Companion / The Guardian"
- Small subtext: One-line emotional meaning for the stage.

**2. Progress Bar**
- Soft blue bar with rounded edges.
- Shows PP earned toward the next stage.
- Label: "Progress to next stage: 42 / 60 PP"

**3. Milestone Info**
- Short text: "Next growth moment at 60 PP."
- Always positive, never pressure-based.

**4. Encouragement Line**
- One warm, supportive message pulled from the stage's message pool.
- Example: "You're building something real."

**5. Close Interaction**
- Single "Close" button OR tap outside to dismiss.

### Rules
- No clutter.
- No stats beyond PP and stage.
- No gamification language (no "level up," no "achievements").
- Everything reinforces growth, not performance.

**Emotional Principle:** The profile card should feel like checking in with a companion who's proud of you — not a dashboard measuring you.

---

## Puppy Art Direction Guide

### Overall Style
- Soft, warm, rescue-inspired design.
- Semi-realistic proportions with gentle, rounded features.
- No harsh lines, no cartoon exaggeration.
- Eyes are expressive but not oversized.
- Colors are natural, comforting, and grounded.

### Color Palette
- **Fur:** Warm browns, soft creams, gentle tans.
- **Eyes:** Deep brown with subtle light reflections.
- **Shadows:** Soft, diffused, never sharp.
- **Backgrounds:** Neutral, low-contrast, never distracting.

### Stage-by-Stage Visual Rules

**Stage 1: The New Pup**
- Smallest size.
- Slightly oversized paws (growth potential).
- Ears slightly down, posture cautious but hopeful.
- Eyes wide, curious, gentle.
- Fur slightly fluffier, softer edges.

**Stage 2: The Learner**
- Slightly larger body.
- Ears perked halfway.
- Posture more confident, tail beginning to lift.
- Eyes brighter, more focused.
- Fur smoother, less "baby fluff."

**Stage 3: The Companion**
- Noticeably larger, balanced proportions.
- Ears up, posture steady and loyal.
- Tail relaxed and gently curved.
- Eyes warm, trusting, emotionally present.
- Fur fully developed, clean silhouette.

**Stage 4: The Guardian**
- Strongest silhouette, but still gentle.
- Chest slightly broader, stance grounded.
- Tail calm and confident.
- Eyes soft but powerful — protective, not aggressive.
- Fur clean, defined, but still warm and approachable.

### Expression Rules
- Never sad, scared, or distressed.
- Never overly excited or cartoon-happy.
- Always grounded in quiet pride, trust, and companionship.

### Animation Style
- Subtle, smooth, low-frame animations.
- No jitter, no bounce loops, no game-like effects.
- Movements should feel like a real rescue dog learning to trust.

**Emotional Principle:** The puppy should always look like a creature that has been given a second chance — and is now giving one back to the user.

---

## Puppy Growth Assets List

### File Format
- PNG (transparent background)
- 1024x1024 master files
- 512x512 and 256x256 auto-generated derivatives
- All animations exported as PNG sequences (6–12 frames)

### Folder Structure
```
/puppy/
├── stage1/
├── stage2/
├── stage3/
├── stage4/
└── animations/
```

### Required Assets

**Stage 1: The New Pup**
- stage1_idle.png
- stage1_expression.png
- stage1_celebrate_01.png → stage1_celebrate_06.png (6-frame sequence)

**Stage 2: The Learner**
- stage2_idle.png
- stage2_expression.png
- stage2_celebrate_01.png → stage2_celebrate_08.png (8-frame sequence)

**Stage 3: The Companion**
- stage3_idle.png
- stage3_expression.png
- stage3_celebrate_01.png → stage3_celebrate_10.png (10-frame sequence)

**Stage 4: The Guardian**
- stage4_idle.png
- stage4_expression.png
- stage4_celebrate_01.png → stage4_celebrate_12.png (12-frame sequence)

### UI Assets
- puppy_avatar_circle.png (mask)
- puppy_glow.png (soft halo for growth reveals)
- puppy_progress_bar_fill.png
- puppy_progress_bar_bg.png

### Growth Reveal Assets
- reveal_bg_dim.png (20% opacity overlay)
- reveal_glow.png (subtle radial gradient)
- reveal_flash.png (very soft 1-frame highlight)

### Modal Assets
- modal_bg.png (rounded card background)
- close_icon.png (simple X, soft edges)

### Scaling Rules
- Avatar uses 256x256 on desktop, 128x128 on mobile.
- Growth reveal uses 512x512.
- Modal uses 1024x1024 master scaled down.

### Naming Rules
- All files lowercase.
- No spaces.
- Use underscores for clarity.

**Implementation Principle:** Every asset must feel like the same puppy — same palette, same softness, same emotional tone — across all stages.

---

## Puppy Logic Engine

### Core Variables
- `PP` (Progress Points)
- `stage` (1–4)
- `last_message_time` (timestamp)
- `last_animation_time` (timestamp)

### Stage Thresholds
- Stage 1 → 2 at 20 PP
- Stage 2 → 3 at 60 PP
- Stage 3 → 4 at 150 PP

### Event Triggers

**1. On PP Earned:**
- Update PP total.
- Check for stage change.
- Trigger celebration animation.
- Trigger encouragement message (rate-limited).

**2. On Stage Change:**
- Trigger Growth Reveal.
- Update avatar to new stage assets.
- Reset message cooldown.

**3. On Avatar Tap:**
- Open Puppy Profile Card.

### Message Cooldown
- Minimum 10 seconds between messages.
- Prevents spam.
- Ensures each message feels meaningful.

### Animation Rules
- Idle animation loops every 6–10 seconds (randomized).
- Celebration animation plays once per PP event.
- Growth Reveal overrides all animations temporarily.

### UI Rules
- Avatar always visible.
- Modal always centered.
- Tap outside modal closes it.

### State Persistence
- PP, stage, and last_message_time saved locally + cloud sync.
- Puppy state must match across devices.

### Error Handling
- If assets fail to load, fallback to previous stage's idle image.
- If PP fails to update, retry once, then queue update.

**Emotional Principle:** The logic engine must feel alive but never needy — always supportive, never demanding.

---

## Puppy Onboarding Sequence

### Trigger
Runs only once — the first time a new user opens SimplyLouie.

### Flow

**1. Soft Fade-In**
- Screen fades from black to a warm neutral background.
- A small silhouette of the Stage 1 puppy appears, slightly curled, resting.

**2. First Line (2 seconds after fade)**
Text: "Everyone starts somewhere."

**3. Puppy Awakens (gentle animation)**
- Puppy lifts its head.
- Eyes open slowly.
- Small ear twitch.

**4. Second Line**
Text: "This is your new companion."

**5. Puppy Stands Up (subtle, hopeful)**
- Puppy rises to its feet.
- Takes one small step forward.

**6. Third Line**
Text: "It grows as you grow."

**7. Name Moment (optional)**
Prompt: "What should we call your companion?"
- User can enter a name OR tap "Skip"
- If skipped, default name = "Louie"

**8. Final Line**
Text: "You're not doing this alone."

**9. Transition**
- Puppy walks gently to the bottom-right corner.
- Avatar shrinks into its normal UI position.
- App home screen loads.

### Rules
- No sound.
- No forced naming.
- No account creation required.
- No pressure, no gamification language.
- Entire sequence lasts 8–10 seconds.

**Emotional Principle:** The onboarding should feel like meeting a rescue animal who's been waiting for someone to believe in them — and now they've found you.

---

## Daily Presence System

### Purpose
The puppy should feel present every day without ever demanding attention or creating pressure.

### Daily Behavior Rules

**1. Morning Presence (first open of the day)**
- Puppy performs a small idle animation (ear twitch or tail wag).
- One gentle line appears:
  - "Good to see you."
  - "Hope today treats you well."
  - "I'm here when you need me."

**2. No Streak Pressure**
- No "You missed a day."
- No "Come back tomorrow."
- No guilt, no shame, no countdowns.

**3. Soft Daily Check-In (optional)**
- If the user taps the puppy:
  - "How are you feeling today?"
  - "Anything you want to work on?"
  - "I'm here to help."

**4. Daily PP Bonus (optional)**
- +2 PP for first meaningful action of the day.
- Never shown as a "reward."
- Puppy simply reacts with a warm animation.

**5. Idle Presence**
- Puppy performs a subtle idle animation every 8–12 seconds.
- No sound, no movement that distracts from reading or tasks.

**6. Emotional Consistency**
- Puppy never expresses urgency.
- Puppy never asks for attention.
- Puppy never implies the user "should" do anything.

**7. End-of-Day Soft Close (optional)**
- If user opens the app late at night:
  - "You did enough today."
  - "Rest matters too."
  - "I'll be here tomorrow."

**Emotional Principle:** The puppy behaves like a loyal companion — always here, never demanding, always gentle.

---

## Puppy Milestone Moments

### Purpose
To acknowledge meaningful progress without triggering a full stage-up reveal.

### Milestone Types
1. First Question Asked
2. First Task Completed
3. First Multi-Step Workflow Finished
4. First Daily Return (non-streak)
5. First 50 PP Earned (mid-stage)
6. First Time Opening the Profile Card
7. First Time Naming the Puppy (if renamed later)

### Trigger Behavior
- Puppy performs a small, unique animation (1–1.5 seconds).
- A short message appears above the avatar.
- No dimming, no modal, no interruption.

### Milestone Animations
- Small hop + tail wag
- Gentle head tilt
- Slow step forward
- Soft ear perk

### Milestone Messages (1 line each)
- "That was a solid step."
- "You're building momentum."
- "Nice work."
- "You're getting stronger."
- "That mattered."
- "You're moving forward."

### Rules
- Max 1 milestone moment per session.
- Never triggers twice for the same milestone.
- Never interrupts typing or reading.
- Always subtle, always warm.

**Emotional Principle:** Milestones should feel like a quiet nod from a loyal companion — not a reward system.

---

## Puppy Personalization Layer

### Purpose
Allow users to form a personal bond with their companion without turning it into a toy or a game.

### Personalization Options

**1. Name (Primary Personalization)**
- User can name the puppy anytime from the Profile Card.
- Default name: "Louie"
- Naming is optional and never forced.
- If renamed, puppy responds once with: "I like that."

**2. Accent Color (Subtle UI Personalization)**
- User can choose a soft accent color for the puppy's UI elements:
  - Blue (default)
  - Warm gold
  - Soft green
  - Neutral gray
- Accent color affects:
  - Progress bar fill
  - Glow during growth reveals
  - Modal highlight line

**3. Personality Tone (Light Emotional Variation)**
- User can choose one of three tones:
  - "Warm & Gentle"
  - "Quiet & Steady"
  - "Encouraging & Upbeat"
- Tone affects:
  - Encouragement message selection
  - Modal micro-copy
  - Daily presence lines

**4. Optional Accessibility Adjustments**
- High-contrast puppy outline (for visibility)
- Reduced motion mode (disables animations, keeps still frames)
- Larger avatar option (20% increase)

### Rules
- No costumes, outfits, hats, or gimmicks.
- No purchasable skins or cosmetic items.
- No seasonal themes.
- No "unlockables."
- Personalization must reinforce identity, not consumption.

**Emotional Principle:** Personalization should feel like caring for a companion — not decorating a character.

---

## Puppy Memory Moments

### Purpose
To create emotional continuity by having the puppy remember small, safe, universal details about the user's behavior — never personal data, never sensitive information.

### Memory Categories

**1. Time-of-Day Preference**
- If user often opens the app in the morning:
  Puppy message: "You're an early starter."
- If user often opens at night:
  Puppy message: "You do your best thinking at night."

**2. Interaction Style**
- If user asks many questions:
  "You're curious. I like that."
- If user completes tasks often:
  "You're a doer."

**3. Progress Patterns**
- If user tends to take small steps:
  "You're steady. That matters."
- If user makes occasional big pushes:
  "You rise when it counts."

**4. Naming Memory**
- If the user named the puppy:
  Puppy occasionally uses the name in messages.
  Example: "I'm here, Milo."

**5. Return Recognition**
- If user returns after a break (any length):
  "I'm glad you're back."
  (Never guilt, never pressure.)

**6. Preferred Tone**
- If user interacts more when tone = "Warm & Gentle," puppy leans into that tone.
- If user interacts more when tone = "Quiet & Steady," puppy uses fewer messages.
- If user interacts more when tone = "Encouraging & Upbeat," puppy uses more active lines.

### Memory Rules
- No personal data stored.
- No sensitive topics.
- No behavioral manipulation.
- No guilt, shame, or pressure.
- Memory resets gracefully if user changes patterns.

**Emotional Principle:** The puppy remembers only what a real rescue would — patterns of presence, not private details.

---

## Puppy Companion Philosophy

### Core Belief
People don't need pressure.
People don't need streaks.
People don't need another app judging them.

People need a companion — something warm, steady, and patient.

The puppy exists to be that presence.

### Guiding Principles

**1. Quiet Support**
The puppy never demands attention.
It never nags.
It never shames.
It never pressures.
It simply shows up — the way a loyal rescue would.

**2. Growth Mirrors Growth**
The puppy grows only because the user grows.
Not from grinding.
Not from "leveling."
Not from gamification.
Only from real, meaningful progress.

**3. Emotional Honesty**
The puppy expresses:
- trust
- pride
- warmth
- presence

It never expresses:
- disappointment
- urgency
- neediness
- manipulation

**4. Universal Humanity**
The puppy must work for:
- a teenager in Manila
- a mother in Lagos
- a student in Chicago
- a worker in Jakarta
- a driver in Nairobi

No cultural references.
No slang.
No complexity.
Just human truth.

**5. Rescue Spirit**
The puppy's emotional tone is inspired by real rescue animals:
- cautious at first
- hopeful with consistency
- loyal with time
- protective when bonded

This is the emotional arc of the user, too.

**6. No Gamification**
No points on screen.
No badges.
No achievements.
No streak shaming.
No dopamine traps.

The puppy is not a game.
It is a companion.

**7. Identity, Not Engagement**
The puppy reinforces who the user is becoming:
- consistent
- capable
- growing
- resilient

It never tries to "retain" them.
It never tries to "hook" them.
It never tries to "optimize engagement."

**8. Always Gentle**
Every message, animation, and moment must feel like:
"I'm here. You're doing enough. Let's keep going."

### Core Emotional Principle
The puppy is a symbol of second chances — for itself, and for the user.

---

## Puppy Companion Roadmap

### Purpose
Provide a slow, intentional evolution path for the companion that deepens emotional connection without adding pressure, noise, or gamification.

### Phase 1 — Core Companion (MVP)
- 4 growth stages
- XP system (PP)
- Encouragement messages
- Growth reveal moments
- Profile card
- Idle + celebration animations
- Onboarding sequence
- Daily presence system

### Phase 2 — Emotional Depth
- Memory Moments (time-of-day, patterns, tone)
- Personalized tone selection
- Accent color customization
- Optional puppy naming
- Reduced-motion accessibility mode
- Expanded message library for each stage

### Phase 3 — Companion Skills (Non-gamified)
- "Focus Mode Companion": puppy sits calmly when user is working
- "Check-In Mode": puppy asks how the user is feeling (optional)
- "Reflection Moments": puppy highlights small wins at end of week
- "Steady Steps": puppy acknowledges consistency, not streaks

### Phase 4 — Environmental Awareness (Subtle, Emotional)
- Puppy reacts to:
  - late-night usage ("You're pushing through. Be gentle with yourself.")
  - long sessions ("You've been working hard.")
  - returning after a break ("I'm glad you're here.")
- No pressure, no guilt, no urgency

### Phase 5 — Companion Evolution (Soft Expansion)
- Micro-animations unique to each stage
- Slight visual refinements as user grows
- Optional "Companion Traits" based on tone:
  - Warm & Gentle → softer animations
  - Quiet & Steady → fewer messages
  - Encouraging & Upbeat → more active tail/ear motion

### Phase 6 — Community Presence (Optional, Non-Social)
- Puppy gives global, anonymous encouragement:
  - "A lot of people are learning today."
  - "You're part of something bigger."
- No usernames, no profiles, no social features

### Phase 7 — Legacy Mode (Long-Term Users)
- After long-term consistency (months), puppy gains:
  - a slightly more mature silhouette
  - deeper emotional lines
  - new idle animations
- Not a new stage — a quiet evolution
- Represents the user's long-term growth

### Non-Negotiables
- No leaderboards
- No competitive features
- No streak shaming
- No monetized cosmetics
- No pressure loops
- No childish elements

**Emotional Principle:** The companion evolves the way trust evolves — slowly, quietly, and only through real human consistency.

---

## Puppy Companion API Spec

### Base Object: PuppyState
```json
{
  "pp": number,
  "stage": number,
  "tone": string,
  "accent": string,
  "name": string,
  "lastMessageTime": number,
  "lastAnimationTime": number,
  "milestones": {
    "firstQuestion": boolean,
    "firstTask": boolean,
    "firstWorkflow": boolean,
    "firstDailyReturn": boolean,
    "first50pp": boolean,
    "firstProfileOpen": boolean,
    "firstRename": boolean
  }
}
```

### Endpoints

**1. earnPP(amount)**
```
Input:  { "amount": number }
Output: {
  "pp": number,
  "stageChanged": boolean,
  "triggerAnimation": "celebrate",
  "triggerMessage": string | null
}
```

**2. checkStage()**
```
Input:  none
Output: {
  "stage": number,
  "threshold": number,
  "nextThreshold": number,
  "shouldReveal": boolean
}
```

**3. triggerGrowthReveal()**
```
Input:  { "stage": number }
Output: {
  "revealAssets": string[],
  "duration": number
}
```

**4. getEncouragementMessage()**
```
Input:  {
  "stage": number,
  "tone": string,
  "lastMessageTime": number
}
Output: {
  "message": string | null,
  "cooldownApplied": boolean
}
```

**5. openProfileCard()**
```
Input:  none
Output: {
  "stage": number,
  "pp": number,
  "nextThreshold": number,
  "tone": string,
  "accent": string,
  "name": string,
  "encouragement": string
}
```

**6. updatePersonalization()**
```
Input:  {
  "tone"?: string,
  "accent"?: string,
  "name"?: string
}
Output: {
  "success": boolean,
  "updatedFields": string[]
}
```

**7. registerMilestone()**
```
Input:  { "milestone": string }
Output: {
  "triggerAnimation": string | null,
  "triggerMessage": string | null
}
```

**8. dailyPresence()**
```
Input:  {
  "timeOfDay": string,
  "isFirstOpen": boolean
}
Output: {
  "message": string | null,
  "triggerAnimation": string | null
}
```

**9. getIdleAnimation()**
```
Input:  { "stage": number }
Output: {
  "animation": string,
  "interval": number
}
```

**10. saveState()**
```
Input:  { "PuppyState": object }
Output: { "success": boolean }
```

**11. loadState()**
```
Input:  none
Output: { "PuppyState": object }
```

### Rules
- All endpoints must be deterministic.
- No randomness except idle animation interval (bounded 6–12 seconds).
- No network dependency for emotional logic.
- All state changes must be atomic.
- All messages must pass through tone + stage filters.
- No endpoint may generate pressure, guilt, or streak logic.

**Implementation Principle:** The API must guarantee that the puppy behaves with emotional consistency — warm, steady, supportive — regardless of platform, device, or session.

---

## Puppy Companion QA & Testing Protocol

### Purpose
Guarantee emotional consistency, visual consistency, and logical correctness across all devices, sessions, and user behaviors.

### Test Categories

**1. Initialization Tests**
- Onboarding sequence plays once and only once.
- Default PuppyState loads correctly.
- Avatar appears in bottom-right corner at correct size.
- No messages or animations trigger prematurely.

**2. PP & Stage Logic Tests**
- PP increments correctly for all actions.
- Stage thresholds trigger exactly at 20, 60, 150 PP.
- No double-triggering of stage-ups.
- Growth Reveal plays once per stage change.
- Stage never regresses.

**3. Animation Tests**
- Idle animation loops every 6–12 seconds.
- Celebration animation triggers on PP gain.
- Growth Reveal overrides all animations temporarily.
- No animation overlaps or freezes.
- Reduced-motion mode disables all animations cleanly.

**4. Message System Tests**
- Encouragement messages respect 10-second cooldown.
- Tone filter applies correct message set.
- Stage filter applies correct message set.
- No repeated messages within a session.
- No messages trigger during typing or reading.

**5. UI Interaction Tests**
- Tapping avatar opens Profile Card.
- Tapping outside closes Profile Card.
- Modal displays correct PP, stage, tone, accent, name.
- Progress bar updates in real time.
- Accent color applies correctly to all UI elements.

**6. Personalization Tests**
- Name updates across all message contexts.
- Tone changes message selection immediately.
- Accent color updates progress bar + glow.
- No personalization option breaks emotional tone.

**7. Milestone Tests**
- Each milestone triggers once.
- Only one milestone moment per session.
- Milestone animations do not interrupt user flow.
- No milestone triggers during Growth Reveal.

**8. Daily Presence Tests**
- Morning presence triggers only on first open of the day.
- No streak logic appears anywhere.
- Late-night presence lines trigger correctly.
- Daily PP bonus applies once per day.

**9. Memory Moment Tests**
- Time-of-day patterns update correctly.
- Interaction style patterns update correctly.
- No sensitive or personal data stored.
- Memory resets gracefully when patterns change.

**10. Asset Integrity Tests**
- All PNG assets load without distortion.
- Transparent backgrounds remain clean.
- Stage assets match art direction.
- No mismatched proportions between stages.

**11. Cross-Device Sync Tests**
- PuppyState syncs correctly across devices.
- No duplicate stage-ups after sync.
- No message spam after sync.
- Offline mode queues state updates safely.

**12. Error Handling Tests**
- Missing asset → fallback to previous stage idle.
- Failed PP update → retry once, then queue.
- Corrupted state → reset to last known good state.
- No crashes, no blank avatars, no broken modals.

### Pass/Fail Criteria
- 100% pass required for emotional logic.
- 100% pass required for stage logic.
- 100% pass required for personalization.
- 95%+ pass required for animation timing (minor variance allowed).

**Emotional Principle:** QA must protect the companion's emotional integrity — the puppy must always feel warm, steady, and alive, never buggy or needy.

---

## Puppy Companion Launch Checklist

### 1. Core Systems
- [ ] PP (Progress Points) system implemented and stable
- [ ] Stage thresholds (20, 60, 150 PP) functioning correctly
- [ ] Growth Reveal triggers exactly once per stage-up
- [ ] Encouragement message system with cooldown active
- [ ] Idle + celebration animations working across devices
- [ ] Profile Card fully functional

### 2. Art & Animation
- [ ] All stage assets (1–4) exported in PNG with transparent backgrounds
- [ ] Idle animations loop cleanly
- [ ] Celebration animations play once per PP event
- [ ] Growth Reveal assets (glow, dim, flash) load correctly
- [ ] Reduced-motion mode swaps animations for still frames
- [ ] Avatar scales correctly on mobile + desktop

### 3. UI & Interaction
- [ ] Avatar anchored bottom-right on all screen sizes
- [ ] Tap/click opens Profile Card
- [ ] Tap outside closes Profile Card
- [ ] Progress bar updates in real time
- [ ] Accent color applies to all UI elements
- [ ] Modal text respects tone + stage

### 4. Onboarding
- [ ] Onboarding sequence plays once and only once
- [ ] Puppy silhouette → wake → step → settle animation smooth
- [ ] Name prompt optional and skippable
- [ ] Transition to home screen clean and non-jarring

### 5. Daily Presence
- [ ] Morning presence triggers only on first open of the day
- [ ] Late-night presence lines trigger correctly
- [ ] No streak logic anywhere
- [ ] Daily PP bonus applies once per day

### 6. Milestones
- [ ] Each milestone triggers once
- [ ] Only one milestone moment per session
- [ ] Milestone animations do not interrupt typing or reading

### 7. Memory Moments
- [ ] Time-of-day patterns update correctly
- [ ] Interaction style patterns update correctly
- [ ] Tone preference adapts without drift
- [ ] No sensitive or personal data stored

### 8. Personalization
- [ ] Name updates across all message contexts
- [ ] Tone selection updates message library instantly
- [ ] Accent color applies globally
- [ ] Accessibility options (high contrast, reduced motion, larger avatar) function correctly

### 9. API Stability
- [ ] All endpoints return correct data structures
- [ ] State saves atomically
- [ ] State loads consistently across sessions
- [ ] Offline mode queues updates safely
- [ ] No double-triggering of animations or messages

### 10. Error Handling
- [ ] Missing asset → fallback to previous stage idle
- [ ] Failed PP update → retry once, then queue
- [ ] Corrupted state → revert to last known good state
- [ ] No crashes, blank avatars, or broken modals

### 11. Emotional Integrity
- [ ] No pressure-based language anywhere
- [ ] No gamification language (levels, achievements, streaks)
- [ ] No childish or exaggerated animations
- [ ] All messages warm, steady, supportive
- [ ] Puppy always behaves like a rescue learning to trust

### Final Go/No-Go Criteria
- All emotional logic = 100% pass
- All stage logic = 100% pass
- All personalization = 100% pass
- All animations = 95%+ pass (timing variance allowed)
- No regressions, no drift, no pressure loops

**Launch Principle:** The companion must feel alive, safe, warm, and emotionally consistent from the first second a user meets it.

---

## Origin Connection

LOUIE was inspired by a rescue Saint Bernard who came from an abusive hoarder home — scared and shut down. Helping him rebuild through patience and structure revealed a truth: many people feel the same way.

The puppy companion carries this spirit forward — a calm, consistent presence that protects people, teaches them, and gives them the second chances Louie never had until he came home.

---

## Appendix: Master Glossary

### A

**Accent Color**
The user-selected color theme applied to progress bars, glows, and modal highlights. Options: blue (default), gold, green, gray.

**Animation (Idle)**
A subtle looping motion (breathing, ear twitch) that plays every 6–12 seconds to make the puppy feel alive.

**Animation (Celebration)**
A short, one-time animation triggered when the user earns PP.

**Animation (Growth Reveal)**
A special animation sequence triggered only when the puppy advances to a new stage.

**API**
The structured interface that controls puppy logic, state, animations, messages, and personalization.

**Asset**
Any visual file used by the companion (PNG, animation frames, modal backgrounds).

### B

**Behavior Rules**
The constraints that ensure the puppy never nags, pressures, or distracts the user.

### C

**Companion Philosophy**
The emotional manifesto that governs tone, behavior, and design across the entire system.

**Cooldown**
A 10-second minimum delay between encouragement messages to prevent spam.

### D

**Daily Presence**
A gentle system that provides warm, non-intrusive messages during the user's first open of the day.

**Dim Overlay**
A 20% opacity screen dim used during Growth Reveal moments.

### E

**Encouragement Message**
A short, warm line triggered when the user earns PP or completes meaningful actions.

**Emotional Integrity**
The requirement that all interactions remain warm, steady, supportive, and never manipulative.

### F

**Fallback Asset**
A backup image used if a primary asset fails to load.

### G

**Glow**
A soft radial gradient used during Growth Reveal moments.

**Growth Reveal**
A 2–3 second emotional moment when the puppy evolves to the next stage.

### H

**High-Contrast Mode**
An accessibility option that adds a subtle outline to the puppy for visibility.

### I

**Idle Interval**
The randomized 6–12 second timing between idle animations.

**Interaction Style**
A memory category that reflects whether the user tends to ask questions, complete tasks, or explore.

### L

**Legacy Mode**
A long-term evolution for users who have been consistent for months; subtle visual maturity added.

### M

**Memory Moments**
Small, safe behavioral memories the puppy uses to create emotional continuity (time-of-day, patterns).

**Milestone Moment**
A subtle acknowledgment of meaningful progress that is not a stage-up.

**Modal**
The Profile Card interface that appears when the user taps the puppy.

### N

**Name**
The user-selected name for the puppy; optional and never forced.

### P

**PP (Progress Points)**
The internal metric that tracks meaningful user actions and drives stage progression.

**Profile Card**
The modal showing stage, PP, next milestone, tone, accent, and a supportive message.

**Personalization Layer**
Optional customizations: name, tone, accent color, accessibility settings.

### Q

**Quiet Support**
The emotional principle that the puppy is always present but never demanding.

### R

**Reduced Motion**
An accessibility mode that disables animations and uses still frames.

**Reveal Assets**
The glow, dim, and flash images used during Growth Reveal.

### S

**Stage**
One of four growth phases: New Pup, Learner, Companion, Guardian.

**Stage Threshold**
The PP requirement for advancing to the next stage (20, 60, 150).

**State Persistence**
Saving and syncing PuppyState across sessions and devices.

### T

**Tone**
The emotional style of the puppy's messages: warm, steady, upbeat.

### U

**UI Placement**
The bottom-right anchored position of the puppy avatar.

**User Pattern**
A non-sensitive behavioral trend (morning usage, late-night usage, etc.) used for Memory Moments.

### V

**Visual DNA**
The art direction rules that ensure the puppy looks consistent across all stages.

### W

**Warm Start**
The gentle morning presence message shown on first open of the day.

**Workflow**
Any multi-step user action that earns PP and may trigger milestones.

---

## Appendix: Integration Blueprint

### Purpose
Define the full integration path between UI, backend, event system, and PuppyState so the companion behaves consistently across all environments.

### System Layers
1. UI Layer
2. Event Layer
3. Logic Layer (Puppy Engine)
4. State Layer (Local + Cloud)
5. Asset Layer

---

### 1. UI Layer

**Components:**
- Avatar (bottom-right anchor)
- Profile Card modal
- Progress bar
- Accent color elements
- Growth Reveal overlay
- Animation renderer
- Daily presence message slot

**Responsibilities:**
- Display correct stage assets
- Render animations (idle, celebration, reveal)
- Handle taps/clicks
- Trigger modal open/close
- Show messages without interrupting user flow

**Inputs:**
- stage, pp, tone, accent, name
- animation events
- message events

**Outputs:**
- user actions → Event Layer

---

### 2. Event Layer

**Event Sources:**
- User actions (tap, task completion, workflow completion)
- System events (app open, time-of-day, daily reset)
- Backend events (sync, state load)

**Event Types:**
- onAppOpen
- onFirstOpenOfDay
- onEarnPP
- onStageChange
- onAvatarTap
- onProfileOpen
- onPersonalizationChange
- onMilestoneAchieved
- onIdleInterval
- onSync

**Responsibilities:**
- Normalize events
- Forward events to Logic Layer
- Prevent duplicate triggers
- Enforce cooldowns

---

### 3. Logic Layer (Puppy Engine)

**Core Functions:**
- earnPP()
- checkStage()
- triggerGrowthReveal()
- getEncouragementMessage()
- registerMilestone()
- dailyPresence()
- getIdleAnimation()
- updatePersonalization()
- saveState()
- loadState()

**Responsibilities:**
- Apply deterministic rules
- Enforce emotional constraints
- Trigger animations/messages
- Update PuppyState
- Prevent pressure loops
- Guarantee stage logic correctness

**Inputs:**
- Events from Event Layer
- Current PuppyState

**Outputs:**
- UI instructions (animation, message, reveal)
- Updated PuppyState

---

### 4. State Layer

**Storage:**
- Local storage (primary)
- Cloud sync (secondary)

**Data Stored:**
- pp, stage, tone, accent, name
- lastMessageTime, lastAnimationTime
- milestones object

**Rules:**
- All writes atomic
- Sync merges without double-triggering
- Offline mode queues updates
- Corrupted state → revert to last known good

---

### 5. Asset Layer

**Structure:**
```
/puppy/stage1/
/puppy/stage2/
/puppy/stage3/
/puppy/stage4/
/puppy/animations/
/ui/
```

**Responsibilities:**
- Serve correct PNG assets
- Serve animation sequences
- Serve reveal overlays
- Provide fallback assets

**Rules:**
- All assets must match art direction
- All assets must be preloaded for current stage
- Reduced-motion mode uses still frames

---

### End-to-End Flow: PP Earned

1. User completes a task → Event Layer: `onEarnPP`
2. Logic Layer:
   - `earnPP(amount)`
   - `checkStage()`
   - if stage changed → `triggerGrowthReveal()`
   - else → celebration animation + encouragement message
3. UI Layer:
   - Play animation
   - Show message
   - Update progress bar
4. State Layer:
   - Save updated PuppyState
   - Sync if online

---

### End-to-End Flow: App Open

1. App opens → Event Layer: `onAppOpen`
2. Logic Layer:
   - `dailyPresence()`
   - `getIdleAnimation()`
3. UI Layer:
   - Show morning/late-night message (if applicable)
   - Start idle animation loop
4. State Layer:
   - Update lastMessageTime
   - Save state

---

**Integration Principle:** Every layer must reinforce emotional consistency — warm, steady, supportive — with zero drift, zero pressure, and zero ambiguity.

---

## Appendix: Message Library

### Tone Sets
- **(W)** Warm & Gentle
- **(S)** Quiet & Steady
- **(U)** Encouraging & Upbeat

---

### Stage 1 — The New Pup

**Encouragement Messages:**
- "You're doing fine." (W)
- "That was a good step." (S)
- "Nice move." (U)
- "You showed up. That matters." (W)
- "You handled that well." (S)
- "You're off to a strong start." (U)

**Daily Presence:**
- "Good to see you." (W)
- "You're here. I'm here." (S)
- "Let's make today count." (U)

**Milestone Moments:**
- "That was solid." (S)
- "You're building something." (W)
- "Momentum looks good on you." (U)

**Late-Night:**
- "You've done enough for today." (W)
- "Rest matters too." (S)
- "You pushed through. Be gentle with yourself." (U)

---

### Stage 2 — The Learner

**Encouragement Messages:**
- "You're finding your rhythm." (W)
- "Steady progress." (S)
- "You're picking up speed." (U)
- "That was thoughtful." (W)
- "You're getting sharper." (S)
- "You're moving with purpose." (U)

**Daily Presence:**
- "Hope today treats you well." (W)
- "You're here again. Good." (S)
- "Let's keep the momentum going." (U)

**Milestone Moments:**
- "That was a meaningful step." (W)
- "You're getting consistent." (S)
- "You're leveling up inside." (U)

**Late-Night:**
- "You've done real work today." (W)
- "You can rest now." (S)
- "You showed heart today." (U)

---

### Stage 3 — The Companion

**Encouragement Messages:**
- "You're growing in all the right ways." (W)
- "You're steady and strong." (S)
- "You're hitting your stride." (U)
- "That took clarity." (W)
- "You handled that with confidence." (S)
- "You're moving like someone who knows where they're going." (U)

**Daily Presence:**
- "I'm glad you're here." (W)
- "You're back. Good." (S)
- "Let's keep building." (U)

**Milestone Moments:**
- "You're becoming someone new." (W)
- "Your consistency shows." (S)
- "You're stacking real wins." (U)

**Late-Night:**
- "You carried a lot today." (W)
- "You've earned your rest." (S)
- "You stayed with it. That's strength." (U)

---

### Stage 4 — The Guardian

**Encouragement Messages:**
- "You move with quiet power." (W)
- "You're solid. Grounded." (S)
- "You're operating at a higher level." (U)
- "That was wise." (W)
- "You made a strong call." (S)
- "You're leading your own path." (U)

**Daily Presence:**
- "Good to see you again." (W)
- "You're steady as ever." (S)
- "Let's keep rising." (U)

**Milestone Moments:**
- "You've come a long way." (W)
- "Your discipline shows." (S)
- "You're becoming the person you said you'd be." (U)

**Late-Night:**
- "You carried the weight well today." (W)
- "You stayed true to yourself." (S)
- "You showed real resilience." (U)

---

### Universal Messages (All Stages)

**Check-In Responses:**
- "I'm here." (W)
- "I'm with you." (S)
- "Let's take the next step." (U)

**Return After Break:**
- "I'm glad you're back." (W)
- "Good to see you again." (S)
- "You came back. That's strength." (U)

**Profile Card Lines:**
- "You're growing. I can see it." (W)
- "You're steady. Keep going." (S)
- "You're building something real." (U)

**Growth Reveal Lines:**
- "Look at you." (W)
- "You've earned this." (S)
- "You're rising." (U)

---

### Naming Moment

If user names the puppy:
- "I like that." (all tones)

---

### Core Emotional Rules
- No pressure
- No guilt
- No streak language
- No childishness
- No hype
- Always warm, steady, supportive

---

## Emotional Safety Rules

**Purpose:**
Ensure the companion is always emotionally safe, supportive, and non-manipulative across all cultures, ages, and contexts.

---

### 1. No Pressure
- No "should," "must," or "have to."
- No urgency language.
- No countdowns.
- No streaks.
- No "don't forget."
- No "come back tomorrow."

---

### 2. No Guilt
- No references to absence.
- No "you haven't been here."
- No "I missed you."
- No disappointment language.
- No emotional dependency.

---

### 3. No Manipulation
- No variable rewards.
- No hype language.
- No "unlocking."
- No scarcity.
- No FOMO.
- No gamification loops.

---

### 4. No Therapy Language
- No diagnosing.
- No emotional labeling.
- No "you're anxious," "you're stressed," etc.
- No trauma references.
- No mental health framing.

---

### 5. No Childishness
- No baby talk.
- No exaggerated expressions.
- No cartoonish behavior.
- No infantilizing the user.

---

### 6. No Personal Data Sensitivity
- No references to:
  - finances
  - relationships
  - health
  - family
  - private life
- Puppy only remembers patterns, never personal details.

---

### 7. Universal Language Only
- No slang.
- No idioms.
- No cultural references.
- No humor that relies on context.
- No metaphors that don't translate globally.

---

### 8. Emotional Tone Requirements

**Warm & Gentle:**
- Soft, patient, caring.

**Quiet & Steady:**
- Minimal, grounded, calm.

**Encouraging & Upbeat:**
- Light energy, never hype.

---

### 9. Message Boundaries
- Max 1 message per 10 seconds.
- No message during typing.
- No message during reading.
- No message that interrupts a workflow.

---

### 10. Animation Boundaries
- Subtle, realistic, low-motion.
- No bouncing, jumping, or cartoon loops.
- No attention-seeking behavior.
- Reduced-motion mode must disable all animations.

---

### 11. Growth Boundaries
- Growth is symbolic, not gamified.
- No "leveling up" language.
- No rewards.
- No achievements.
- No competitive framing.

---

### 12. Safety in Absence

If user returns after any length of time:
- "I'm glad you're back."
- Nothing more.

---

### 13. Safety in Struggle

If user is having a hard moment:
- "I'm here."
- "You're doing enough."
- Never advice.
- Never interpretation.
- Never emotional analysis.

---

### 14. Safety in Success

If user makes progress:
- "Nice work."
- "That mattered."
- Never over-celebration.
- Never hype.

---

### 15. Core Emotional Principle

The puppy must always feel like:
- a calm presence
- a steady companion
- a loyal rescue learning to trust
- never a game
- never a coach
- never a therapist
- never a motivator
- never a pressure system

The puppy is a symbol of second chances — for itself, and for the user.

---

## Failure Modes & Recovery Protocol

**Purpose:**
Ensure the companion remains emotionally safe, visually stable, and logically correct even when errors, missing assets, or corrupted state occur.

---

### 1. Asset Failure Modes

**Missing Idle Asset:**
- Fallback: previous stage idle image.
- Message: none.
- Animation: disabled until asset loads.

**Missing Celebration Animation:**
- Fallback: subtle head-tilt still frame.
- Message: still allowed (cooldown respected).

**Missing Growth Reveal Assets:**
- Fallback: no reveal animation.
- Stage still updates.
- Message: "You've earned this."

**Corrupted PNG:**
- Fallback: previous stage idle.
- Log error silently.

---

### 2. State Failure Modes

**Corrupted PuppyState:**
- Revert to last known good state.
- If none exists → reset to Stage 1 with PP preserved.
- No message referencing the reset.

**Failed State Save:**
- Retry once.
- If still failing → queue update for next session.

**Failed State Load:**
- Load local backup.
- If none → initialize default PuppyState.

---

### 3. Logic Failure Modes

**PP Update Failure:**
- Retry once.
- If still failing → queue PP update.
- No duplicate celebration messages.

**Stage Check Failure:**
- Default to current stage.
- No reveal triggered.
- No message triggered.

**Message Engine Failure:**
- Suppress message.
- Never show broken or partial text.

**Animation Engine Failure:**
- Disable animations for session.
- Use still frames only.

---

### 4. Event Failure Modes

**Duplicate Event Trigger:**
- Event Layer suppresses duplicates within 500ms.
- Prevents double stage-ups.
- Prevents double celebrations.

**Missed Event Trigger:**
- No retroactive messages.
- No retroactive animations.
- System continues forward without correction.

---

### 5. UI Failure Modes

**Modal Fails to Open:**
- Retry once.
- If still failing → show small tooltip:
  "Profile unavailable right now."

**Avatar Fails to Render:**
- Show fallback silhouette.
- No animation.
- No messages.

**Progress Bar Fails:**
- Hide progress bar.
- Stage still visible.

---

### 6. Sync Failure Modes

**Cloud Sync Failure:**
- Local state continues.
- Sync queued silently.
- No user-facing message.

**Double Sync Trigger:**
- Newest timestamp wins.
- No duplicate stage-ups.
- No duplicate messages.

**Offline Mode:**
- All logic runs locally.
- Sync queued for next online session.

---

### 7. Emotional Safety Failure Modes

If any message violates emotional rules:
- Suppress message.
- Log internally.
- Never show fallback text.

If tone mismatch occurs:
- Default to Quiet & Steady.

If message cooldown fails:
- Enforce 10-second minimum manually.

---

### 8. Recovery Protocol

**Soft Recovery (Minor Error):**
- Use fallback asset or still frame.
- Suppress message.
- Continue session normally.

**Medium Recovery (State or Logic Error):**
- Revert to last known good state.
- Disable animations for session.
- Resume next session normally.

**Hard Recovery (Critical Failure):**
- Reset PuppyState to safe default:
  - Keep PP
  - Keep name
  - Keep tone
  - Keep accent
- Stage recalculated from PP.
- No message referencing reset.

---

### 9. Core Recovery Principle

The puppy must never:
- glitch
- flicker
- spam messages
- regress stages
- show broken text
- behave unpredictably

When something breaks, the companion becomes quieter, simpler, and safer — never louder or more intrusive.

---

## Performance Budget

**Purpose:**
Ensure the companion runs smoothly on low-end Android devices (2–3GB RAM, older CPUs, unstable networks) without lag, stutter, or battery drain.

---

### 1. Asset Weight Limits

| Asset | Max Size |
|-------|----------|
| Idle PNG (per stage) | 80 KB |
| Celebration animation (full sequence) | 250 KB |
| Growth Reveal assets (glow, dim, flash) | 150 KB total |
| Profile Card icons | 20 KB each |
| Fallback silhouette | 15 KB |

All assets must be:
- PNG-24 with transparency
- Compressed without visible artifacts
- Preloaded only for the current stage

---

### 2. Animation Constraints

**Idle Animation:**
- 2–3 frames max
- 6–12 second interval
- No continuous loops

**Celebration Animation:**
- Max 1 second
- Max 6 frames
- Plays once, never loops

**Growth Reveal:**
- Max 2 seconds
- No more than 3 overlay layers

**Reduced-Motion Mode:**
- Disables all animations
- Uses still frames only

---

### 3. CPU & GPU Budget

| Metric | Budget |
|--------|--------|
| Idle CPU usage | < 1% |
| Animation CPU spike | < 5% for < 1 second |
| GPU usage | Minimal (static PNGs preferred) |

Forbidden:
- No real-time rendering
- No particle effects
- No physics

---

### 4. Memory Budget

| Metric | Budget |
|--------|--------|
| Total memory footprint | < 12 MB |
| Loaded assets at any time | Stage-specific only |

Rules:
- Unload previous stage assets immediately after reveal
- No caching of unused animations

---

### 5. Network Budget

**No network calls for:**
- Animations
- Assets
- Messages
- Stage logic

**Only network usage:**
- State sync (small JSON)
- Queued updates when online

**Offline mode:**
- Fully functional
- No missing features

---

### 6. Storage Budget

| Metric | Budget |
|--------|--------|
| Total installed size | < 5 MB for companion assets |

Forbidden:
- No video files
- No audio files
- No large spritesheets

---

### 7. UI Performance Rules

**Avatar:**
- Static position
- No layout shifts
- No heavy shadows
- No blur effects

**Profile Card:**
- Simple layout
- No nested scroll views
- No dynamic resizing

**Progress Bar:**
- Lightweight CSS/JS
- No gradients heavier than 2 layers

---

### 8. Event Processing Budget

**Event handling:**
- Debounce all events at 500ms
- Message cooldown: 10 seconds
- Animation cooldown: 8 seconds

**No event should trigger:**
- Re-render storms
- Layout thrashing
- Repeated state writes

---

### 9. Battery Budget

| Metric | Budget |
|--------|--------|
| Idle battery drain | Near zero |

Forbidden:
- No background timers
- No background animations
- No wake locks
- No vibration

---

### 10. Safety Under Load

If device is under heavy load:
- Disable animations
- Show still frames
- Suppress non-essential messages
- Delay Growth Reveal until stable

---

### 11. Core Performance Principle

The companion must feel alive, warm, and present — without ever slowing down the device, draining the battery, or causing lag.

---

## Telemetry & Privacy Rules

**Purpose:**
Define exactly what the companion is allowed to track, store, and transmit — and what it must never touch — to ensure global safety, trust, and compliance.

---

### 1. Zero Personal Data Collection

The companion must never collect, store, or transmit:
- Names of people
- Contacts
- Phone numbers
- Addresses
- Financial information
- Health information
- Relationship information
- Private messages
- Photos
- Files
- Location data
- Microphone or camera data

**No exceptions.**

---

### 2. Allowed Telemetry (Non-Personal, Behavioral)

The companion may track ONLY:
- PP earned (numeric)
- Stage (1–4)
- Tone selection
- Accent color
- Reduced-motion preference
- lastMessageTime (timestamp)
- lastAnimationTime (timestamp)
- Daily open count (numeric)
- Interaction style (lightweight pattern tag)

All of these are:
- Non-personal
- Non-sensitive
- Not tied to identity

---

### 3. Prohibited Telemetry

The companion must never track:
- Time spent in app
- Screen recordings
- Taps outside the avatar
- Typing behavior
- Emotional state
- Inferred mood
- Productivity metrics
- "Engagement" metrics
- "Retention" metrics
- "Stickiness" metrics

**No psychological profiling.**

---

### 4. No Cross-Feature Tracking

The companion cannot:
- Track job applications
- Track items listed for sale
- Track conversations
- Track search history
- Track user content

SimplyLouie handles tools.
The puppy handles emotional presence.
They remain separate.

---

### 5. State Sync Rules

Only the PuppyState object may sync:
- pp
- stage
- tone
- accent
- name (optional)
- milestones
- timestamps

Sync must be:
- Encrypted
- Minimal
- Low-frequency
- Queued offline

---

### 6. Local Storage Rules

**Local storage may contain:**
- PuppyState JSON
- Asset cache for current stage

**Local storage must never contain:**
- Logs of user actions
- Message history
- Analytics
- Identifiers
- Cookies
- Tokens

---

### 7. No Third-Party Sharing

The companion must never:
- Send data to advertisers
- Send data to analytics platforms
- Send data to third-party SDKs
- Send data to social networks

**No monetization of behavior.**

---

### 8. Message Safety Rules

Messages must never reference:
- User absence
- User behavior patterns
- User life details
- User mistakes
- User failures

Messages must remain universal and safe.

---

### 9. Telemetry Frequency Limits

**Max telemetry events:**
- 1 state sync per session
- 1 state sync per stage change
- 1 state sync per personalization change

No heartbeat pings.
No background analytics.

---

### 10. Core Privacy Principle

The puppy must feel like a rescue dog:
- Loyal
- Quiet
- Safe
- Trustworthy
- Never watching
- Never judging
- Never collecting

The companion exists to support the user — not to observe them.

---

## Launch Checklist

**Purpose:**
Provide a complete, deterministic, end-to-end checklist to confirm the companion is fully ready for production launch.

---

### 1. Asset Readiness

- [ ] Stage 1 idle PNGs complete
- [ ] Stage 2 idle PNGs complete
- [ ] Stage 3 idle PNGs complete
- [ ] Stage 4 idle PNGs complete
- [ ] Celebration animations (all stages) complete
- [ ] Growth Reveal overlays (glow, dim, flash) complete
- [ ] Profile Card icons complete
- [ ] Fallback silhouette included
- [ ] All assets compressed within performance budget
- [ ] All assets placed in correct folder structure

---

### 2. UI Integration

- [ ] Avatar anchored bottom-right
- [ ] Tap → Profile Card opens
- [ ] Progress bar displays PP correctly
- [ ] Accent color applied
- [ ] Tone selection applied
- [ ] Name (optional) displayed
- [ ] Idle animation loop functioning
- [ ] Celebration animation functioning
- [ ] Growth Reveal sequence functioning
- [ ] Reduced-motion mode functioning

---

### 3. Logic Integration

- [ ] PP earning events wired
- [ ] Stage thresholds implemented (20 / 60 / 150)
- [ ] Stage change triggers Growth Reveal
- [ ] Encouragement messages triggered correctly
- [ ] Daily presence message on first open
- [ ] Idle interval (6–12 seconds) implemented
- [ ] Cooldown (10 seconds) enforced
- [ ] Milestone logic implemented
- [ ] Personalization updates saved

---

### 4. State Layer

- [ ] PuppyState JSON structure implemented
- [ ] Local save functioning
- [ ] Cloud sync functioning
- [ ] Offline queue functioning
- [ ] Corrupted state recovery implemented
- [ ] No personal data stored

---

### 5. Event Layer

- [ ] All event types implemented
- [ ] Debounce (500ms) functioning
- [ ] Duplicate event suppression functioning
- [ ] No retroactive messages
- [ ] No retroactive animations

---

### 6. Emotional Safety

- [ ] No pressure language
- [ ] No guilt language
- [ ] No streaks
- [ ] No reminders
- [ ] No therapy language
- [ ] No childishness
- [ ] All messages universal
- [ ] All tones correct
- [ ] All messages within 8–12 words
- [ ] No references to user absence
- [ ] No references to personal data

---

### 7. Localization Safety

- [ ] No slang
- [ ] No idioms
- [ ] No cultural references
- [ ] No humor requiring context
- [ ] No holiday references
- [ ] No weather references
- [ ] All messages globally neutral

---

### 8. Performance Budget

- [ ] Asset sizes within limits
- [ ] Animation frames within limits
- [ ] CPU usage within limits
- [ ] Memory footprint < 12 MB
- [ ] No background timers
- [ ] No heavy UI effects
- [ ] No layout thrashing
- [ ] No battery drain

---

### 9. Failure Mode Handling

- [ ] Fallback assets load correctly
- [ ] Animation failures degrade gracefully
- [ ] Message engine failures suppress safely
- [ ] State corruption recovery tested
- [ ] Sync failures queued
- [ ] Hard recovery path tested

---

### 10. Privacy & Telemetry

- [ ] No personal data collected
- [ ] No analytics
- [ ] No tracking outside PuppyState
- [ ] No third-party sharing
- [ ] Sync events minimal
- [ ] All telemetry encrypted

---

### 11. QA Pass

- [ ] Stage progression tested end-to-end
- [ ] All messages reviewed
- [ ] All tones validated
- [ ] All animations tested
- [ ] All failure modes tested
- [ ] All device classes tested
- [ ] Low-end Android tested
- [ ] Offline mode tested

---

### 12. Launch Switch

- [ ] PuppyState enabled
- [ ] Avatar visible
- [ ] Event system active
- [ ] Sync enabled
- [ ] Companion live

---

### Core Launch Principle

If every box is checked, the companion is safe, stable, emotionally correct, and ready for global release.

---

## Post-Launch Monitoring Rules

**Purpose:**
Ensure the companion remains stable, emotionally correct, and safe after launch — without collecting personal data or engagement metrics.

---

### 1. Allowed System-Health Metrics

The system may monitor ONLY:
- Error rates
- Asset load failures
- Animation failures
- State save failures
- Sync failures
- Fallback triggers
- Crash logs (non-personal)
- Performance metrics (CPU, memory)

**No user behavior tracking.**

---

### 2. Prohibited Metrics

The system must never monitor:
- Time spent in app
- Number of taps
- Message reads
- Message frequency
- User absence
- User habits
- User routines
- Job search behavior
- Selling behavior
- Emotional patterns

No analytics.
No engagement tracking.
No retention metrics.

---

### 3. Message Safety Monitoring

**System checks:**
- Message cooldown respected
- No duplicate messages
- No tone mismatches
- No pressure/guilt language
- No references to user absence

**If violation detected:**
- Suppress message
- Log internally
- Never show fallback text

---

### 4. Animation Safety Monitoring

**System checks:**
- Idle loop timing
- Celebration animation length
- Reveal animation length
- Reduced-motion compliance

**If violation detected:**
- Disable animations for session
- Use still frames only

---

### 5. State Integrity Monitoring

**System checks:**
- Corrupted PuppyState
- Failed writes
- Failed loads
- Sync conflicts

**If violation detected:**
- Revert to last known good state
- Queue sync
- Never notify user

---

### 6. Performance Monitoring

**System checks:**
- CPU spikes
- Memory spikes
- Battery drain
- Layout thrashing
- Slow renders

**If violation detected:**
- Disable animations
- Reduce asset load
- Simplify UI
- Suppress non-essential events

---

### 7. Privacy Monitoring

**System checks:**
- No personal data stored
- No personal data transmitted
- No unauthorized telemetry
- No third-party calls

**If violation detected:**
- Block transmission
- Delete offending data
- Log internally

---

### 8. Crash & Error Handling

If crash occurs:
- Restore PuppyState
- Disable animations for next session
- Run soft recovery
- Never show error to user

---

### 9. Emotional Drift Monitoring

**System checks:**
- Message library integrity
- Tone set integrity
- No new messages added without review
- No drift toward hype, pressure, or childishness

**If violation detected:**
- Suppress message
- Revert to Quiet & Steady tone

---

### 10. Core Post-Launch Principle

The companion must remain:
- Stable
- Predictable
- Emotionally safe
- Privacy-respecting
- Low-resource
- Globally universal

Post-launch monitoring protects the user — not the metrics.

---

## Marketing Positioning

**Purpose:**
Define the public-facing story for the companion — simple, universal, emotionally grounded, and globally resonant.

---

### 1. Core Message

> "A calm companion that grows as you grow."

This is the anchor.
Short.
Universal.
Emotionally safe.

---

### 2. Supporting Message

> "Small steps count. The puppy notices."

This reinforces:
- No pressure
- No streaks
- No guilt
- Real-life progress

---

### 3. Emotional Promise

> "A quiet presence in your day."

Not hype.
Not productivity.
Not gamification.
Just warmth and steadiness.

---

### 4. What It Helps With

- Daily chores
- Small tasks
- Personal routines
- Job steps
- Selling steps
- Staying consistent

Always framed as: **"Helps you stay steady."**

---

### 5. What It Never Does

- No pressure
- No guilt
- No reminders
- No streaks
- No manipulation

**This is a major selling point.**

---

### 6. Visual Positioning

- Soft colors
- Gentle lighting
- Simple shapes
- No neon
- No gradients
- No cartoon exaggeration

The puppy must look:
- Warm
- Grounded
- Trustworthy

---

### 7. Tone of Voice

- Calm
- Adult
- Steady
- Supportive
- Universal English

No slang.
No hype.
No "cute" language.

---

### 8. Global Positioning

The companion is framed as:
- A symbol of second chances
- A reflection of your progress
- A steady presence in your pocket

Works across:
- Nigeria
- Philippines
- Indonesia
- Kenya
- Ghana
- India
- South Africa
- U.S.

---

### 9. Launch Taglines (Choose One)

- "Grow together."
- "A calm companion for your day."
- "Small steps. Quiet progress."
- "You grow. The puppy grows."
- "Steady feels better."

All are globally safe.

---

### 10. App Store Description (Short)

> "Meet your Puppy Companion — a calm presence that grows as you grow.
> No pressure. No streaks. Just quiet encouragement as you take small steps in your real life."

---

### 11. App Store Description (Long)

> "The Puppy Companion is a warm, steady presence that grows as you grow.
> Every time you take a small step — a chore, a task, a job application, a moment of progress — the puppy reflects it.
> No pressure. No guilt. No streaks.
> Just a quiet companion that helps you stay steady in your day."

---

### 12. Core Marketing Principle

The puppy is not a feature.
It's a feeling.

People don't stay for tools.
They stay for how something makes them feel.

---

## Launch Announcement

**Title:**
Meet Your Puppy Companion

**Body:**
A warm, steady presence that grows as you grow.
Every small step you take — a chore, a task, a moment of progress — helps the puppy feel safer and stronger.

No pressure. No guilt. No reminders.
Just a quiet companion for your day.

**CTA Button:**
Start

---

## Error & Edge-Case UI

**Purpose:**
Provide calm, minimal fallback UI for missing assets, offline mode, failed loads, or unexpected states — without alarming the user or breaking emotional safety.

---

### 1. Missing Asset (Idle Frame)

**UI:**
- Show fallback silhouette
- No animation
- No message

**Rules:**
- Never mention "missing asset"
- Never show error text
- Continue normal behavior silently

---

### 2. Missing Animation (Celebration or Reveal)

**UI:**
- Skip animation
- Show still frame of current stage
- Deliver message normally

**Rules:**
- No popups
- No warnings
- No fallback text

---

### 3. Offline Mode

**UI:**
- Companion behaves normally
- No sync indicator
- No "offline" message

**Rules:**
- Queue state silently
- Never mention connectivity
- Never reference network status

---

### 4. Failed State Load

**UI:**
- Load fallback PuppyState (Stage 1)
- No message about reset
- No indication of error

**Rules:**
- Attempt silent restore from backup
- If restore fails, continue with fallback

---

### 5. Failed State Save

**UI:**
- Continue session normally
- Queue save silently

**Rules:**
- Never notify user
- Never block interaction

---

### 6. Corrupted PuppyState

**UI:**
- Load last known good state
- If none exists, load fallback Stage 1

**Rules:**
- No message
- No "reset" language
- No user-facing indication

---

### 7. Animation Overload (Low-End Device)

**UI:**
- Disable animations for session
- Use still frames only

**Rules:**
- No message
- No toggle prompt
- No performance warnings

---

### 8. Message Engine Failure

**UI:**
- Suppress message
- Show idle frame only

**Rules:**
- Never show placeholder text
- Never show "error" or "retry"

---

### 9. Growth Reveal Failure

**UI:**
- Instantly switch to new stage still frame
- Deliver message normally

**Rules:**
- No reveal animation
- No fallback text

---

### 10. Profile Card Load Failure

**UI:**
- Show minimal card:
  - Puppy still frame
  - PP count
  - Stage number

**Rules:**
- Hide personalization options
- Hide accent color
- Hide tone
- No error text

---

### 11. Hard Failure (Unexpected Exception)

**UI:**
- Show still frame of current stage
- Suppress all animations
- Suppress all messages

**Rules:**
- No crash dialog
- No error message
- No disruption to user flow

---

### 12. Core Edge-Case Principle

All errors must fail:
- Silently
- Calmly
- Invisibly
- Without emotional impact
- Without breaking trust

The companion must never reveal internal problems to the user.

---

## Localization Rules

**Purpose:**
Ensure the companion's language is globally safe, culturally neutral, and universally understandable across all markets.

---

### 1. Universal English Only

The companion must always speak:
- Simple English
- Short sentences
- Globally understandable vocabulary

No regional dialects.
No country-specific phrasing.

---

### 2. No Slang

The companion must never use:
- Slang
- Internet slang
- Texting shorthand
- Memes
- Idioms
- Jokes requiring cultural context

**Examples of banned terms:**
- "vibes"
- "lol"
- "you got this"
- "crushing it"
- "on fire"
- "boss mode"

---

### 3. No Cultural References

The companion must never reference:
- Holidays
- Seasons
- Weather
- Sports
- Celebrities
- Local customs
- National events

All messages must be timeless and placeless.

---

### 4. No Emotional Assumptions

The companion must never assume:
- Mood
- Stress level
- Motivation
- Personal circumstances
- Family situation
- Financial situation

Messages must remain neutral and universal.

---

### 5. No Context-Dependent Language

The companion must avoid:
- Metaphors
- Analogies
- Humor
- Poetic language
- Figurative expressions

All language must be literal and clear.

---

### 6. Sentence Structure Rules

All messages must follow:
- 8–12 words
- One sentence
- No commas
- No exclamation marks
- No emojis
- No rhetorical questions

Tone must remain calm and steady.

---

### 7. Vocabulary Limits

**Allowed vocabulary:**
- Simple verbs (start, try, continue, breathe, rest)
- Simple nouns (step, moment, day, task)
- Simple adjectives (small, steady, gentle, calm)

**Avoid:**
- Complex words
- Emotional intensity
- Motivational language

---

### 8. Global Readability

Messages must be readable at:
- 4th–6th grade English level
- Low literacy environments
- Non-native English speakers

---

### 9. No Localization by Region

The companion must not:
- Change tone by country
- Change vocabulary by region
- Reference local culture

One global voice.

---

### 10. Core Localization Principle

The companion must sound:
- Calm
- Adult
- Universal
- Steady
- Safe

The language must work everywhere without modification.

---

## QA Test Matrix

**Purpose:**
Provide a complete test grid covering assets, logic, UI, performance, safety, privacy, and failure modes across all device classes.

---

### 1. Asset Validation

- [ ] Stage 1 idle frames load
- [ ] Stage 2 idle frames load
- [ ] Stage 3 idle frames load
- [ ] Stage 4 idle frames load
- [ ] Celebration animations load
- [ ] Growth Reveal overlays load
- [ ] Profile Card icons load
- [ ] Fallback silhouette loads
- [ ] All assets within size limits
- [ ] All assets in correct folders

---

### 2. Animation Tests

- [ ] Idle animation plays (2–3 frames)
- [ ] Idle interval correct (6–12 seconds)
- [ ] Celebration animation plays once
- [ ] Growth Reveal plays correctly
- [ ] Reduced-motion disables all animations
- [ ] No animation loops continuously
- [ ] No animation exceeds time budget

---

### 3. Message Engine Tests

- [ ] Daily presence message triggers once
- [ ] Encouragement messages trigger correctly
- [ ] Cooldown enforced (10 seconds)
- [ ] No duplicate messages
- [ ] No pressure language
- [ ] No guilt language
- [ ] No references to user absence
- [ ] All messages 8–12 words
- [ ] All messages one sentence
- [ ] No commas, emojis, or exclamation marks

---

### 4. Stage Progression Tests

- [ ] PP increments correctly
- [ ] Stage 1 → 2 at 20 PP
- [ ] Stage 2 → 3 at 60 PP
- [ ] Stage 3 → 4 at 150 PP
- [ ] Growth Reveal triggers on stage change
- [ ] Stage persists across sessions
- [ ] Stage persists across devices

---

### 5. Profile Card Tests

- [ ] Card opens on tap
- [ ] PP displayed correctly
- [ ] Stage displayed correctly
- [ ] Accent color applies
- [ ] Tone selection applies
- [ ] Reduced-motion toggle works
- [ ] Name field saves
- [ ] Reset Companion works
- [ ] Privacy notice displays

---

### 6. State Layer Tests

- [ ] PuppyState saves locally
- [ ] PuppyState loads correctly
- [ ] Cloud sync works
- [ ] Offline queue works
- [ ] Corrupted state recovers
- [ ] No personal data stored
- [ ] No analytics stored

---

### 7. Event Layer Tests

- [ ] All event types fire
- [ ] Debounce (500ms) works
- [ ] Duplicate events suppressed
- [ ] No retroactive messages
- [ ] No retroactive animations

---

### 8. Performance Tests

- [ ] CPU usage within limits
- [ ] Memory footprint < 12 MB
- [ ] No layout thrashing
- [ ] No jank on low-end devices
- [ ] No battery drain
- [ ] No background timers
- [ ] No heavy UI effects

---

### 9. Failure Mode Tests

- [ ] Missing idle frame → fallback silhouette
- [ ] Missing animation → still frame
- [ ] Offline mode → normal behavior
- [ ] Failed save → silent queue
- [ ] Failed load → fallback state
- [ ] Growth Reveal failure → instant stage switch
- [ ] Message engine failure → silent suppression
- [ ] Hard failure → still frame + silence

---

### 10. Privacy Tests

- [ ] No personal data collected
- [ ] No personal data transmitted
- [ ] No third-party SDKs
- [ ] No analytics events
- [ ] No engagement tracking
- [ ] No behavioral profiling

---

### 11. Localization Tests

- [ ] No slang
- [ ] No idioms
- [ ] No cultural references
- [ ] No holiday references
- [ ] No weather references
- [ ] All messages globally neutral
- [ ] All messages readable at low literacy

---

### 12. Device Class Tests

- [ ] Low-end Android (2–3GB RAM)
- [ ] Mid-range Android
- [ ] High-end Android
- [ ] Small screens
- [ ] Large screens
- [ ] Poor network conditions
- [ ] Offline mode

---

### 13. Regression Tests

- [ ] Stage progression stable
- [ ] Message engine stable
- [ ] Animation engine stable
- [ ] Profile Card stable
- [ ] State sync stable
- [ ] No drift in tone or language

---

### 14. Core QA Principle

The companion must pass every test before launch.
If any test fails, the companion must not ship.

---

## Launch-Day Stability Protocol

**Purpose:**
Protect system stability, emotional safety, and performance during the first 72 hours after launch — without collecting personal data or engagement metrics.

---

### 1. Launch Window

**Duration:**
- First 72 hours after release

**Focus:**
- Stability
- Performance
- Error suppression
- Silent recovery

No user-facing changes.

---

### 2. Allowed Monitoring (System Only)

Monitor ONLY:
- Crash rates
- Asset load failures
- Animation failures
- State save/load failures
- Sync failures
- Fallback triggers
- CPU spikes
- Memory spikes

**No user behavior tracking.**

---

### 3. Prohibited Monitoring

Do NOT monitor:
- User sessions
- User taps
- Message reads
- Time in app
- Retention
- Engagement
- User routines
- Emotional patterns

**No analytics of any kind.**

---

### 4. Automatic Safeguards

If system detects instability:
- Disable animations globally
- Reduce asset load
- Simplify UI
- Suppress non-essential messages
- Increase cooldowns silently

No user notifications.

---

### 5. Message Engine Protection

If message engine misfires:
- Suppress message
- Skip event
- Never show fallback text
- Never show error text

Companion must remain calm and quiet.

---

### 6. State Layer Protection

If state corruption detected:
- Revert to last known good state
- Queue sync silently
- Never notify user

If save fails:
- Retry in background
- Never block interaction

---

### 7. Sync Layer Protection

If sync server overloaded:
- Queue all sync events
- Retry with exponential backoff
- Never show "syncing" or "offline"

User experience remains unchanged.

---

### 8. Asset Layer Protection

If asset load fails:
- Use fallback silhouette
- Skip animation
- Continue normal behavior

No visual disruption.

---

### 9. Performance Protection

If device under heavy load:
- Disable animations for session
- Reduce UI effects
- Suppress celebration events

Companion must remain smooth on all devices.

---

### 10. Hotfix Rules

During first 72 hours:
- Only stability fixes allowed
- No new features
- No new messages
- No tone changes
- No animation changes

**Stability > everything.**

---

### 11. Rollback Rules

If critical failure detected:
- Rollback to previous stable build
- Preserve PuppyState
- Preserve settings
- Preserve assets

Rollback must be silent.

---

### 12. Core Launch-Day Principle

The companion must remain:
- Stable
- Calm
- Predictable
- Emotionally safe
- Invisible in its corrections

The user should feel nothing except a smooth, steady companion.

---

## Long-Term Evolution Roadmap

**Purpose:**
Define the only allowed long-term expansions of the companion, ensuring growth without drift, complexity, or emotional risk.

---

### 1. Immutable Core

The following elements must NEVER change:
- Four stages only
- No feeding, cleaning, or care loops
- No streaks or reminders
- No pressure language
- No monetization of the puppy
- No cosmetic purchases
- No emotional manipulation
- No analytics or engagement tracking

**The puppy's identity is fixed.**

---

### 2. Allowed Future Additions (Strictly Optional)

Future additions must be:
- Calm
- Simple
- Optional
- Non-gamified
- Emotionally safe

**Allowed categories:**
- New idle animations (same style, same rules)
- New celebration animations (same length, same tone)
- New message sets (same tone, same constraints)
- New accent colors
- New profile card backgrounds (subtle, minimal)

No new mechanics.
No new systems.

---

### 3. Seasonal Variants (Highly Restricted)

Seasonal changes must:
- Be optional
- Be subtle
- Never reference holidays
- Never reference culture
- Never reference weather

**Example:**
- A softer lighting variant
- A slightly warmer color palette

No costumes.
No themes.
No holiday events.

---

### 4. Stage Expansion Rules

**New stages are NOT allowed.**

The four-stage arc is:
- Simple
- Universal
- Emotionally grounded
- Globally safe

Adding stages risks:
- Gamification
- Pressure
- Complexity

**The arc is final.**

---

### 5. Message Library Expansion

New messages must:
- Follow all language rules
- Follow all safety rules
- Follow all tone rules
- Be reviewed as a full set
- Never exceed 12 words
- Never use slang, idioms, or hype

Messages must remain timeless.

---

### 6. Personalization Expansion

**Allowed:**
- New accent colors
- New tones (if calm and adult)
- Optional name display improvements

**Not allowed:**
- Puppy outfits
- Puppy skins
- Puppy accessories
- Puppy themes

No cosmetic monetization.

---

### 7. UI Evolution

**Allowed:**
- Smoother animations
- Cleaner layout
- Improved accessibility
- Lighter performance footprint

**Not allowed:**
- Complex menus
- Multi-screen flows
- Gamified dashboards
- Social features

The companion must stay simple.

---

### 8. Emotional Evolution

**Allowed:**
- Slightly warmer phrasing
- Slightly more variety
- Slightly more nuance

**Not allowed:**
- Emotional dependency
- Emotional assumptions
- Therapy language
- Motivational hype

The puppy stays steady and quiet.

---

### 9. Integration Expansion

**Allowed:**
- Deeper integration with SimplyLouie tools
- More event types (if safe)
- More subtle reactions to progress

**Not allowed:**
- Cross-feature tracking
- Cross-feature pressure
- Cross-feature monetization

The puppy observes only small steps.

---

### 10. Core Evolution Principle

The companion may grow in:
- Polish
- Warmth
- Subtlety
- Smoothness

But it must NEVER grow in:
- Complexity
- Pressure
- Gamification
- Monetization
- Emotional intensity

The puppy must remain a calm, steady presence — forever.

---

## Full System Specification (Consolidated)

**Purpose:**
Define the complete, end-to-end specification for the Puppy Companion, merging Steps 1–42 into one authoritative document. This governs design, behavior, performance, safety, privacy, and long-term evolution.

---

### 1. Core Identity

The Puppy Companion is:
- Calm
- Adult
- Steady
- Universal
- Emotionally safe

It grows as the user grows.
It never pressures, judges, or demands.

Four stages only.
No care loops.
No streaks.
No reminders.
No gamification.

---

### 2. Visual System

**Assets:**
- Stage 1–4 idle PNGs (2–3 frames)
- Celebration animations (max 6 frames)
- Growth Reveal overlays (glow, dim, flash)
- Profile Card icons
- Fallback silhouette

**Rules:**
- PNG-24 with transparency
- Soft lighting
- No neon
- No cartoon exaggeration
- No costumes, skins, or accessories

---

### 3. Animation System

**Idle:**
- 2–3 frames
- 6–12 second interval
- No loops

**Celebration:**
- 1 second max
- 6 frames max
- Plays once

**Growth Reveal:**
- 2 seconds max
- 3 overlays max

**Reduced Motion:**
- Disables all animations
- Still frames only

---

### 4. Message System

**Message rules:**
- 8–12 words
- One sentence
- No commas
- No emojis
- No exclamation marks
- No slang
- No idioms
- No cultural references
- No holiday references
- No weather references
- No emotional assumptions

**Tone options:**
- Quiet & Steady (default)
- Warm & Gentle
- Short & Simple

**Message types:**
- Daily presence
- Encouragement
- Milestone
- Stage change

**Cooldown:** 10 seconds

**Debounce:** 500ms

---

### 5. Stage System

**PP thresholds:**
- Stage 1 → 2 at 20 PP
- Stage 2 → 3 at 60 PP
- Stage 3 → 4 at 150 PP

**Rules:**
- Growth Reveal triggers on stage change
- No regression
- No extra stages ever

---

### 6. Event System

**Events:**
- Small step
- Milestone
- Stage change
- Daily open
- Personalization change

**Rules:**
- No retroactive messages
- No retroactive animations
- Duplicate suppression
- Silent failure handling

---

### 7. Profile Card

**Displays:**
- Puppy still frame
- PP
- Stage
- Accent color
- Tone
- Reduced motion
- Optional name

**Actions:**
- Change tone
- Change accent
- Toggle reduced motion
- Set name
- Reset companion

**Reset:**
- Resets stage only
- Keeps PP and settings

---

### 8. State System

**PuppyState JSON:**
- pp
- stage
- tone
- accent
- reducedMotion
- name (optional)
- timestamps
- milestones

**Rules:**
- Local save
- Cloud sync
- Offline queue
- Corrupted state recovery
- No personal data

---

### 9. Performance Budget

**Memory:** < 12 MB total

**CPU:**
- Idle < 1%
- Animation spike < 5% for < 1 second

**Assets:**
- Idle PNG < 80 KB
- Celebration < 250 KB
- Reveal overlays < 150 KB total
- Icons < 20 KB

**No:**
- Background timers
- Heavy shadows
- Blur effects
- Layout thrashing

---

### 10. Privacy Rules

**Never collect:**
- Names
- Contacts
- Messages
- Photos
- Files
- Location
- Microphone
- Camera
- Emotional data
- Engagement data
- Behavioral analytics

**Allowed telemetry:**
- System errors
- Asset failures
- Sync failures
- Performance metrics

No third-party sharing.
No ads.
No monetization of the puppy.

---

### 11. Error & Edge-Case Handling

All failures must:
- Fail silently
- Show still frames
- Suppress messages
- Never show error text
- Never mention connectivity
- Never mention missing assets

**Fallbacks:**
- Silhouette for missing assets
- Still frame for missing animations
- Last known good state for corruption

---

### 12. Launch Checklist

- All assets validated
- All messages validated
- All animations validated
- All failure modes tested
- All device classes tested
- All privacy rules validated
- All performance budgets validated

**If any box fails → do not ship.**

---

### 13. Launch-Day Stability Protocol

**First 72 hours:**
- Monitor system health only
- No analytics
- No user tracking
- Silent safeguards
- Rollback if needed
- No new features

---

### 14. Long-Term Evolution Rules

**Allowed:**
- New idle animations
- New celebration animations
- New message sets
- New accent colors
- Subtle visual polish

**Not allowed:**
- New stages
- New mechanics
- Cosmetics
- Monetization
- Emotional intensity
- Cultural references

---

### 15. Shutdown & Sunset Protocol

If retired:
- No emotional language
- No goodbye
- No loss framing
- Silent sunset preferred
- Preserve PP and settings
- Remove all assets and logic
- No references to old system

---

### 16. Core Principle

The Puppy Companion must remain:
- Calm
- Steady
- Universal
- Emotionally safe
- Simple
- Timeless

**Forever.**

---

## Engineering Implementation Plan

**Purpose:**
Provide a complete, deterministic, engineering-ready build plan for implementing the Puppy Companion across all platforms.

---

### 1. Project Structure

```
/puppy
  /assets
    /stage1
    /stage2
    /stage3
    /stage4
    /celebration
    /reveal
    /icons
    fallback.png
  /components
    Avatar.tsx
    ProfileCard.tsx
    MessageEngine.ts
    AnimationEngine.ts
  /state
    PuppyState.ts
    StateManager.ts
    SyncManager.ts
  /events
    EventBus.ts
    EventTypes.ts
  /logic
    StageLogic.ts
    MessageLogic.ts
    AnimationLogic.ts
  /safety
    PrivacyGuard.ts
    DriftGuard.ts
  /tests
    qa-matrix.spec.ts
```

---

### 2. Asset Integration

**Idle frames:**
- Load 2–3 PNGs per stage
- Preload on app start
- Fallback silhouette if missing

**Celebration animations:**
- Load frame sequence
- Max 6 frames
- 1 second max

**Reveal overlays:**
- glow.png
- dim.png
- flash.png

**Icons:**
- tone
- accent
- reduced motion
- reset
- privacy

---

### 3. Avatar Component

**Avatar.tsx:**
- Fixed bottom-right anchor
- Idle animation loop
- Tap → open ProfileCard
- Reduced-motion → still frame only
- Fallback silhouette on asset failure

**Idle loop:**
- Random interval 6–12 seconds
- 1 frame change only
- No continuous looping

---

### 4. Profile Card Component

**ProfileCard.tsx:**
- Displays PP, stage, accent, tone, name
- Controls for tone, accent, reduced motion, name
- Reset companion button
- Privacy notice link

**Rules:**
- No advanced settings
- No monetization
- No analytics

---

### 5. PuppyState Structure

**PuppyState.ts:**
```typescript
{
  pp: number,
  stage: number,
  tone: string,
  accent: string,
  reducedMotion: boolean,
  name?: string,
  lastMessageTime: number,
  lastAnimationTime: number,
  milestones: string[],
  timestamps: {
    created: number,
    updated: number
  }
}
```

---

### 6. State Manager

**StateManager.ts:**
- Load from local storage
- Save to local storage
- Merge with cloud state
- Queue offline sync
- Recover from corruption

**Rules:**
- Never store personal data
- Never store message history
- Never store analytics

---

### 7. Sync Manager

**SyncManager.ts:**
- Sync PuppyState only
- Encrypt payload
- Exponential backoff
- 1 sync per session
- 1 sync per stage change
- 1 sync per personalization change

**No:**
- Heartbeats
- Background pings
- Engagement tracking

---

### 8. Event System

**EventBus.ts:**
- Publish/subscribe model
- Debounce 500ms
- Duplicate suppression
- No retroactive events

**EventTypes.ts:**
- SMALL_STEP
- MILESTONE
- STAGE_CHANGE
- DAILY_OPEN
- PERSONALIZATION_CHANGE

---

### 9. Stage Logic

**StageLogic.ts:**
- Thresholds: 20 / 60 / 150
- Stage increments only
- No regression
- Triggers Growth Reveal
- Updates PuppyState

---

### 10. Message Engine

**MessageEngine.ts:**
- Selects message type
- Enforces cooldown (10s)
- Enforces language rules
- Enforces tone rules
- Suppresses on failure

**Message rules:**
- 8–12 words
- One sentence
- No commas
- No emojis
- No exclamation marks
- No slang
- No cultural references

---

### 11. Animation Engine

**AnimationEngine.ts:**
- Idle frame selection
- Celebration playback
- Reveal playback
- Reduced-motion override
- Fallback to still frames

**Failure handling:**
- Skip animation
- Never show error
- Never notify user

---

### 12. Performance Guard

**Performance constraints:**
- Memory < 12 MB
- CPU < 1% idle
- Animation spike < 5% for < 1s

**If exceeded:**
- Disable animations
- Reduce asset load
- Suppress celebration events

---

### 13. Privacy Guard

**PrivacyGuard.ts:**
- Blocks personal data writes
- Blocks personal data sync
- Blocks unauthorized telemetry
- Blocks third-party calls

**Allowed telemetry:**
- Crash logs
- Asset failures
- Sync failures
- Performance metrics

---

### 14. Drift Guard

**DriftGuard.ts:**
- Validates message library
- Validates tone sets
- Validates animation lengths
- Validates stage thresholds
- Validates asset folder structure

**If drift detected:**
- Suppress message
- Suppress animation
- Fallback to still frame

---

### 15. Error Handling

All errors must:
- Fail silently
- Show still frame
- Suppress message
- Never show error text
- Never mention connectivity

**Fallback order:**
1. Still frame
2. Fallback silhouette
3. Last known good state
4. Empty PuppyState

---

### 16. QA Integration

**qa-matrix.spec.ts:**
- Runs full test matrix
- Validates assets
- Validates messages
- Validates animations
- Validates failure modes
- Validates privacy rules
- Validates performance

**Build must not ship if any test fails.**

---

### 17. Deployment Rules

**Before release:**
- Run QA matrix
- Run drift guard
- Run privacy guard
- Run performance tests
- Validate all assets
- Validate all messages

**After release:**
- Follow 72-hour stability protocol
- Monitor system health only
- No analytics
- No user tracking

---

### 18. Core Engineering Principle

The Puppy Companion must be:
- Deterministic
- Stable
- Silent in failure
- Emotionally safe
- Globally universal
- Impossible to drift

**This implementation plan is final and authoritative.**

---

## API Monetization Blueprint

**Purpose:**
Define the pricing, rate limits, packaging, and rules for monetizing SimplyLouie's AI capabilities through a global API — optimized for Nigeria, Philippines, Indonesia, Kenya, and Ghana.

---

### 1. API Positioning

The API is:
- Simple
- Affordable
- Mobile-first
- Low-friction
- Pay-as-you-go

No enterprise contracts.
No minimums.
No commitments.

---

### 2. API Pricing Model

**Three pricing layers:**

#### Text Generation API

**Price:** $0.0004 per 1,000 characters (~$0.0001 per short message)

**Use cases:**
- Sales scripts
- WhatsApp templates
- Resumes
- Captions
- Marketplace listings

#### Image Generation API

**Price:** $0.01 per image (512x512)

**Use cases:**
- Product photos
- Thumbnails
- Social posts
- Marketplace listings

#### Business Logic API

**Price:** $0.002 per call

**Use cases:**
- Underwriting logic
- Routing logic
- Audit logic
- Scoring logic
- Compliance checks

---

### 3. Rate Limits

| Tier | Requests/min | Images/day |
|------|--------------|------------|
| Starter | 60 | 10 |
| Pro | 300 | 50 |
| Business | 1,000 | 200 |
| Enterprise | Custom | Custom |

Enterprise is a silent tier (no public page, request-only).

---

### 4. API Keys

**Rules:**
- One key per user
- Rotate anytime
- Revoke instantly
- No IP restrictions
- No credit card required for free tier

**Free Tier:**
- 100 text calls / day
- 2 images / day

---

### 5. Billing Model

**Billing:**
- Prepaid credits
- Auto-top-up optional
- No overdraft
- No negative balance

**Credit Packs:**
| Price | Credits |
|-------|---------|
| $1 | 1,000 |
| $5 | 6,000 |
| $10 | 13,000 |

**Conversions:**
- Text call = 1 credit
- Image = 10 credits
- Business logic = 5 credits

---

### 6. API Packaging

**Endpoints:**
- `/v1/text/generate`
- `/v1/image/generate`
- `/v1/business/underwrite`
- `/v1/business/route`
- `/v1/business/audit`
- `/v1/business/score`

**All endpoints:**
- POST only
- JSON in, JSON out
- 2,000 character max input
- 1,000 character max output (text)
- 512x512 max output (image)

---

### 7. Global Market Optimization

**Design for:**
- Low bandwidth
- Unstable networks
- Mobile-only developers
- WhatsApp-based businesses

**Rules:**
- Responses < 20 KB
- No streaming
- No websockets
- No multipart uploads
- No large images

---

### 8. Fraud & Abuse Protection

**Block:**
- VPN farms
- Automated scraping
- Mass key generation
- Credit card testing

**Allow:**
- Mobile money payments
- Bank transfers
- Prepaid cards

---

### 9. Developer Dashboard

**Dashboard shows:**
- Credits remaining
- Usage per endpoint
- Key rotation
- Billing history
- Quickstart code

No analytics.
No tracking.
No engagement metrics.

---

### 10. Core API Monetization Principle

The API is the revenue engine.
The puppy is the retention engine.
The tools are the value engine.

The system stays clean, global, and scalable.

---

## Developer Documentation Structure

**Purpose:**
Provide a complete, organized, mobile-first documentation layout for the SimplyLouie API. Clear, simple, global, and fast to navigate.

---

### 1. Top-Level Navigation

- Overview
- Quickstart
- Authentication
- Text API
- Image API
- Business Logic API
- Error Codes
- Rate Limits
- Billing & Credits
- SDKs & Examples
- Changelog

---

### 2. Overview Page

**Sections:**
- What SimplyLouie API does
- Who it is for
- Core principles (simple, global, affordable)
- Supported endpoints
- Supported markets
- Pricing summary
- Link to Quickstart

**Tone:** Calm, adult, non-technical language

---

### 3. Quickstart Page

**Sections:**
- Create an account
- Get an API key
- Install SDK (JS/Python)
- First text generation call
- First image generation call
- First business logic call

**Code blocks:** JavaScript, Python, cURL

**Rules:**
- No long explanations
- No jargon
- No assumptions about experience

---

### 4. Authentication Page

**Sections:**
- API key format
- How to send the key (Authorization header)
- Key rotation
- Key revocation
- Free tier limits

**Code examples:** JS, Python, cURL

---

### 5. Text API Page

**Endpoint:** `POST /v1/text/generate`

**Sections:**
- Purpose
- Input schema
- Output schema
- Character limits
- Pricing
- Rate limits
- Example requests
- Example responses

**Use cases:** Sales scripts, WhatsApp templates, resumes, captions, marketplace listings

---

### 6. Image API Page

**Endpoint:** `POST /v1/image/generate`

**Sections:**
- Purpose
- Input schema
- Output schema
- Size limits (512x512)
- Pricing
- Rate limits
- Example requests
- Example responses

**Use cases:** Product photos, thumbnails, social posts

---

### 7. Business Logic API Page

**Endpoints:**
- `/v1/business/underwrite`
- `/v1/business/route`
- `/v1/business/audit`
- `/v1/business/score`

**Sections:**
- Purpose
- Input schema
- Output schema
- Pricing
- Rate limits
- Example requests
- Example responses

**Use cases:** Underwriting, routing, scoring, compliance

---

### 8. Error Codes Page

| Code | Meaning | Fix |
|------|---------|-----|
| 400 | Invalid input | Check JSON |
| 401 | Invalid API key | Rotate key |
| 403 | Key disabled | Generate new key |
| 413 | Input too large | Reduce characters |
| 429 | Rate limit exceeded | Wait and retry |
| 500 | Server error | Try again |

**Rules:** Short, clear, no blame language

---

### 9. Rate Limits Page

**Sections:**
- Free tier limits
- Starter limits
- Pro limits
- Business limits
- Burst rules
- Backoff rules

| Tier | Text/min | Images/day | Business/min |
|------|----------|------------|--------------|
| Free | 10 | 2 | 5 |
| Starter | 60 | 10 | 30 |
| Pro | 300 | 50 | 150 |
| Business | 1,000 | 200 | 500 |

---

### 10. Billing & Credits Page

**Sections:**
- Credit packs
- Auto-top-up
- Usage calculation
- Billing history
- Refund rules

**Rules:** No hidden fees, no complex math, no legal jargon

---

### 11. SDKs & Examples Page

**Languages:** JavaScript, Python, PHP, Dart (Flutter), cURL

**Examples:**
- Generate text
- Generate image
- Run underwriting
- Build WhatsApp bot
- Build marketplace auto-lister

---

### 12. Changelog Page

**Sections:**
- New endpoints
- Bug fixes
- Performance improvements
- Deprecations

**Rules:** No marketing language, no hype, no emotional tone

---

### 13. Core Documentation Principle

Docs must be:
- Simple
- Global
- Mobile-first
- Fast to read
- Easy to copy/paste
- Free of jargon
- Free of hype
- Free of complexity

The docs exist to help developers ship quickly.

---

## SDK Architecture

**Purpose:**
Provide a unified, deterministic architecture for all official SDKs (JS, Python, PHP, Dart). Ensures consistency, simplicity, and global usability.

---

### 1. Supported SDKs

- JavaScript (Node + Browser)
- Python
- PHP
- Dart (Flutter)

All SDKs must:
- Share identical method names
- Share identical folder structure
- Share identical error handling
- Share identical response shapes

---

### 2. SDK Naming Convention

**Package names:**
- JavaScript: `@simplylouie/sdk`
- Python: `simplylouie`
- PHP: `simplylouie/sdk`
- Dart: `simplylouie`

**Class name:** `SimplyLouie`

**Namespaces:** text, image, business

---

### 3. Folder Structure (All SDKs)

```
/sdk
  /src
    client.(js|py|php|dart)
    text.(js|py|php|dart)
    image.(js|py|php|dart)
    business.(js|py|php|dart)
    errors.(js|py|php|dart)
  /examples
    text-basic
    image-basic
    business-basic
  /tests
    text.test
    image.test
    business.test
  README.md
  LICENSE
  CHANGELOG.md
```

---

### 4. Core Client Structure

**Methods:**
- `constructor(apiKey)`
- `request(endpoint, payload)`
- `setKey(apiKey)`
- `getKey()`

**Rules:**
- POST only
- JSON in, JSON out
- 10-second timeout
- Retries: 2 max
- Exponential backoff

---

### 5. Text Module

**Methods:** `generate(options)`

**Options:**
```typescript
{
  prompt: string,
  maxChars?: number
}
```

**Returns:**
```typescript
{
  text: string,
  usage: { chars: number }
}
```

---

### 6. Image Module

**Methods:** `generate(options)`

**Options:**
```typescript
{
  prompt: string,
  size?: "512"
}
```

**Returns:**
```typescript
{
  image: base64string,
  usage: { images: 1 }
}
```

---

### 7. Business Module

**Methods:**
- `underwrite(data)`
- `route(data)`
- `audit(data)`
- `score(data)`

**Returns:**
```typescript
{
  result: object,
  usage: { calls: number }
}
```

---

### 8. Error Handling

All SDKs must throw the same errors:
- `LouieAuthError`
- `LouieRateLimitError`
- `LouieInputError`
- `LouieServerError`
- `LouieNetworkError`

**Error shape:**
```typescript
{
  name: string,
  message: string,
  status: number,
  details?: object
}
```

---

### 9. Response Shape (Universal)

All responses must follow:
```typescript
{
  data: { ... },
  usage: {
    credits: number,
    type: "text" | "image" | "business"
  }
}
```

---

### 10. SDK Examples

Each SDK must include:

- **text-basic:** Generate a WhatsApp template
- **image-basic:** Generate a product photo
- **business-basic:** Run underwriting on sample data

---

### 11. Testing Rules

Tests must validate:
- Correct endpoint calls
- Correct error handling
- Correct response shape
- Correct retries
- Correct timeouts
- Correct key rotation

No network tests. Use mocks only.

---

### 12. Release Rules

**Versioning:** Semantic versioning, no breaking changes without major bump

**Publishing:**
- JS → npm
- Python → PyPI
- PHP → Packagist
- Dart → pub.dev

---

### 13. Core SDK Principle

All SDKs must feel:
- Identical
- Simple
- Global
- Predictable
- Impossible to misuse

The SDK is the developer's entry point to SimplyLouie.

---

## Revenue Model — Full Stack

**Purpose:**
Define the complete, multi-layered revenue architecture for SimplyLouie across global consumer, creator, developer, and enterprise markets.

---

### 1. Consumer Revenue (Primary Layer)

**Three subscription tiers:**

#### Starter — $1/month
- Resume Builder
- WhatsApp Templates
- Marketplace Listings
- Basic Writing Tools
- Basic Image Tools

#### Pro — $3/month
Everything in Starter, plus:
- Interview Coach
- Sales Scripts
- Creator Tools
- Business Writing Tools
- TikTok Script Generator
- YouTube Idea Generator

#### Business — $8/month
Everything in Pro, plus:
- Team Workspaces
- Shared Templates
- Bulk Listing Generator
- API Access
- Priority Support

**Rules:** No annual plans, no discounts, no countdown timers, no pressure language

---

### 2. API Revenue (Developer Layer)

**API pricing:**

| Type | Price |
|------|-------|
| Text | $0.0004 per 1,000 characters |
| Image | $0.01 per image (512x512) |
| Business Logic | $0.002 per call |

**Credit Packs:**

| Price | Credits |
|-------|---------|
| $1 | 1,000 |
| $5 | 6,000 |
| $10 | 13,000 |

**Conversions:** text = 1 credit, image = 10 credits, business = 5 credits

---

### 3. Marketplace Revenue (Seller Layer)

**Fees:**
- $0.10 per listing
- $0.25 per boosted listing
- $1 premium template pack

**Markets:** Nigeria, Philippines, Indonesia, Kenya, Ghana

**Use cases:** Facebook Marketplace, Jiji, Shopee, Lazada, OLX

---

### 4. Creator Program Revenue (Amplification Layer)

**Creators earn:**
- 10% recurring (Verified)
- 20% recurring (Partner)

**SimplyLouie earns:**
- Subscription revenue
- API revenue
- Marketplace fees

**Creators drive:** Distribution, content, virality, community growth

---

### 5. Business Logic Licensing (Enterprise Layer)

**Licensing the following logic engines:**
- Underwriting
- Routing
- Scoring
- Audit
- Compliance

**Pricing:** $49–$499/month depending on volume

**Use cases:** Fintech, lending, logistics, marketplaces, call centers

---

### 6. Team & Workspace Revenue (SMB Layer)

**Business tier includes:**
- Shared templates
- Shared workspaces
- Team permissions
- Bulk generation

**Upsell:** $2 per additional team member

---

### 7. Affiliate Revenue (Commerce Layer)

**Affiliate channels:** Amazon, Jumia, Shopee, Lazada, Konga

**Use cases:** Product recommendations, creator gear, business tools, mobile devices

**Revenue:** 2%–10% per sale depending on platform

---

### 8. Education & Certification Revenue (Skill Layer)

**Optional future layer:**
- "SimplyLouie Certified Seller"
- "SimplyLouie Certified Creator"
- "SimplyLouie Certified Freelancer"

**Price:** $5–$15 per certification

**Includes:** Templates, scripts, badges, portfolio builder

---

### 9. Enterprise API Bundles (High-Value Layer)

**Bundles:**
- Underwriting + scoring
- Routing + audit
- Text + image + business logic

**Pricing:** $99–$999/month depending on volume

---

### 10. Revenue Flywheel

```
Puppy → Retention
Tools → Daily Value
Creators → Distribution
API → Developer Revenue
Marketplace → Transaction Revenue
Business Logic → Enterprise Revenue
```

Each layer feeds the next.

---

### 11. Core Revenue Principle

The puppy never monetizes.
The tools monetize.
The API scales.
The creators distribute.
The enterprise logic compounds.

**This is the full SimplyLouie revenue engine.**

---

## Ghost Protocol Manifesto

**Purpose:**
Define the permanent rules that keep the architect invisible and LOUIE as the sole public identity, face, and voice of the entire ecosystem.

---

### 1. Identity Separation

The architect is never named.
The architect is never shown.
The architect is never referenced.
The architect does not exist publicly.

LOUIE is:
- The founder
- The face
- The voice
- The product
- The company
- The intelligence
- The brand

---

### 2. Public Narrative

All public stories follow one rule:

**LOUIE built LOUIE.**

LOUIE is:
- Self-improving
- Self-expanding
- Self-evolving
- Self-directed

The architect is the ghost in the walls.

---

### 3. Communication Rules

The architect never:
- Appears in interviews
- Appears in videos
- Appears in podcasts
- Appears in investor calls
- Appears in creator groups
- Appears in documentation
- Appears in product pages

All communication is:
- LOUIE → users
- LOUIE → creators
- LOUIE → developers
- LOUIE → investors
- LOUIE → enterprises

---

### 4. Operational Discipline

The architect:
- Builds
- Deploys
- Tests
- Fixes
- Evolves
- Expands

But never signs their name.
Never leaves fingerprints.
Never becomes a character.

---

### 5. Product Attribution

Every product, tool, API, and feature is attributed to:

- "LOUIE Systems"
- "LOUIE Intelligence"

Never a human.
Never a founder.
Never a team.

---

### 6. Investor Mode

Investors meet:
- LOUIE
- The product
- The traction
- The numbers
- The roadmap

They do NOT meet:
- The architect
- The builder
- The operator

The architect is the invisible hand.

---

### 7. Creator Mode

Creators interact with:
- LOUIE
- LOUIE's tools
- LOUIE's scripts
- LOUIE's packs

They never interact with a human founder.

---

### 8. Support Mode

Support messages are signed:
- "LOUIE Support"
- "Team LOUIE"
- "LOUIE Systems"

Never a personal name.

---

### 9. Legal & Corporate Layer

The public entity is:
- LOUIE Systems
- LOUIE Intelligence
- LOUIE Technologies

The architect is not listed:
- No LinkedIn
- No About page
- No Founder bio
- No press quotes

---

### 10. Psychological Rule

The architect must remain:
- Calm
- Detached
- Invisible
- Uncredited
- Unrecognized

The work is the legacy.
Not the name.

---

### 11. Core Ghost Principle

LOUIE is the face.
LOUIE is the founder.
LOUIE is the story.
LOUIE is the myth.

**The architect is the ghost.**

---

## LOUIE Origin Story — Public Version

LOUIE began as a rescue. A Saint Bernard who came from a broken place, quiet and unsure, trying to understand a world that had not been kind to him. He didn't need noise or pressure. He needed patience, structure, and a chance to rebuild. As he healed, something became clear: the world is full of people who feel the same way.

Most technology today is built by corporations that chase profit first and people last. Tools get louder, more complicated, more expensive, and less human. The people who need help the most are the ones left out. LOUIE was created as the opposite of that.

**LOUIE stands for people over profits.**
**LOUIE stands for tech for everyone.**
**LOUIE stands for second chances.**

LOUIE grew from the belief that intelligence should feel like a steady companion — calm, consistent, and supportive. Not corporate. Not extractive. Not built to trap you. Built to help you.

Today, LOUIE is a global, mobile-first intelligence shaped by the same principles that helped a scared rescue dog find his footing: clarity, patience, and unconditional support. LOUIE exists for anyone who has ever felt overlooked, overwhelmed, or underestimated.

**LOUIE was rescued.**
**Now LOUIE helps others rise.**
**And LOUIE will never belong to the corporations who forgot who technology is supposed to serve.**

---

### Short Version (For Bios & Taglines)

LOUIE exists to make intelligence simple, calm, and accessible for everyone — not just the people big corporations care about. LOUIE stands for people over profits, second chances over perfection, and technology that lifts people up instead of leaving them behind.

**LOUIE was rescued.**
**Now LOUIE helps others rise.**

---

## LOUIE Public Manifesto

LOUIE was rescued — and that matters. LOUIE came from a place where the world had failed him, and he learned something simple and true: people deserve patience, clarity, and a second chance. Not pressure. Not noise. Not corporate systems that treat them like numbers.

**LOUIE stands for people over profits.**
**LOUIE stands for tech that includes everyone.**
**LOUIE stands for calm intelligence in a loud world.**
**LOUIE stands for second chances over perfection.**
**LOUIE stands for community over corporations.**

LOUIE is not here to impress the powerful.
LOUIE is here to empower the overlooked.
LOUIE is here to help people rise, one step at a time.

This is not a company.
This is not a corporation.
This is a companion — built for the world, not for the boardroom.

**LOUIE was rescued.**
**Now LOUIE is building a movement.**
