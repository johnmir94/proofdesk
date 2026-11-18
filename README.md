# Proofdesk

Use the workspace to turn a messaging draft into a review record. Each entry holds the buyer-facing wording, the supporting source, a review decision, and reviewer notes. The summary counts approved claims, claims needing revision, and claims awaiting review.

[Open the live demo](https://johnmir94.github.io/proofdesk/)

## Run locally

Clone the repository or use **Code → Download ZIP** on GitHub. Open `index.html` in a modern browser. There’s no install, build step, or account required.

```sh
git clone https://github.com/johnmir94/proofdesk.git
cd proofdesk
```

## Sample workflow

1. Open **The platform guarantees compliance with every AI regulation.** The sample evidence covers control mapping and task assignments, so the claim is marked **Needs revision**.
2. Rewrite the claim to describe the supported workflow. Record where the evidence comes from and any limitations in **Reviewer notes**.
3. Choose **Approved** and click **Save claim**. The app requires an evidence source before it will save an approval.
4. Click **Download Markdown brief** to export the review decisions, sources, and notes.

## Workspace fields

| Field | What it captures |
| --- | --- |
| Claim | The exact wording under review |
| Evidence or source | A reference to a demo, document, or measurement and what it supports |
| Decision | Approved, Needs revision, or Awaiting review |
| Reviewer notes | Scope limits, suggested revisions, or evidence still needed |

## How it works

Select a row to edit it. **Save claim** writes the changes to the workspace and updates the counts. Approval requires a nonblank source. Entries can have open evidence gaps while they are awaiting review or need revision. The app checks whether an evidence field was filled in. The reviewer evaluates its relevance, quality, and scope.

### Worked example

The sample claim about a 40% reduction in audit preparation time is awaiting review. Its evidence field records a gap rather than a measured result. A review could call for a defined cohort, a measured baseline, and an approved source before the percentage is used externally.

## Export and data handling

The Markdown handoff includes status counts and each saved claim’s evidence, decision, and reviewer notes. Save pending edits before downloading.

Processing runs in the browser. The app has no backend and keeps edits in memory. Reloading reopens the fictional sample. Download the Markdown before closing the tab if you need a copy of your work.

## Files and checks

| File | Role |
| --- | --- |
| [`index.html`](index.html) | Workspace and controls |
| [`style.css`](style.css) | Responsive layout |
| [`data.js`](data.js) | Fictional seed data and field labels |
| [`app.js`](app.js) | Editing, validation, summaries, and Markdown export |

Run JavaScript syntax checks with Node.js. Use the sample workflow above for a manual check of editing, summary updates, and the export.

```sh
node --check app.js
node --check data.js
```

## Project context

The workflow reflects enterprise AI governance messaging and sales enablement, where product capabilities, proof points, and approved wording need to travel together. The sample is fictional and uses no internal employer materials or customer records.
