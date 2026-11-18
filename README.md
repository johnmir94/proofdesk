# Proofdesk

**AI governance messaging and sales enablement**

Proofdesk helps product marketers review buyer-facing AI governance claims before sales uses them. Each claim carries its evidence, review decision, and any limits on the wording. The Markdown handoff gives sales and reviewers a record they can refer to after the review.

[Open the live demo](https://johnmir94.github.io/proofdesk/)

## Why I built it

Drawing on my enterprise AI governance messaging and sales enablement experience, I built this to show how a marketer translates a technical capability into a claim that can be backed up and used with the right scope.

## Try the sample

1. Open **The platform guarantees compliance with every AI regulation.** The sample evidence covers control mapping and task assignments, so the claim is marked **Needs revision**.
2. Rewrite the claim to describe the supported workflow. Record where the evidence comes from and any limitations in **Reviewer notes**.
3. Choose **Approved** and click **Save claim**. The app requires an evidence source before it will save an approval.
4. Click **Download Markdown brief** to export the review decisions, sources, and notes.

The app checks that an approved claim has a source entered. Assessing the quality of that source and approving the wording are reviewer decisions.

## Run locally

Download the repository ZIP or clone it, then open `index.html` in a modern browser.

```sh
git clone https://github.com/johnmir94/proofdesk.git
cd proofdesk
```

The app uses HTML, CSS, and JavaScript and runs entirely in the browser without an account or backend. Sample data is fictional. Edits stay in the current tab, so download the Markdown before reloading or closing it.

## Source files

| File | Role |
| --- | --- |
| `index.html` | Workspace layout and controls |
| `style.css` | Responsive styling |
| `data.js` | Fictional sample workspace |
| `app.js` | Editing, validation, summaries, and Markdown export |
