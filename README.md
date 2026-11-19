# Noviye

A gentle daily space for Noviye (English). Built from the same design as Hiwiye's page,
fitted to rotating 6-hour shifts: she taps **On shift**, **Resting** or **Day off**, and the
page follows. Prayer is on by default. Data is stored separately from other pages on this
site (`novi-day` database, `novi:` storage keys).

## What's changed

- Mood and an optional need come first. Mood alone is enough to save.
- Longer reflections, routines, water and self-care ideas are optional.
- The weekly recap has no score, streak or missed-day penalty.
- Three routines are suggested; every routine can be turned off.
- Guided reflection separates an event, assumptions, needs and a next step.
- Older tasks remain available without automatically moving into today.
- Text and voice drafts survive reloads; saving waits for the database write.
- The calendar refreshes when returning to the page and across midnight.
- Backup/restore includes voice recordings. A delete-all control clears entries
  and drafts after confirmation.
- Native checkboxes, labeled mood buttons, keyboard focus, reduced motion,
  and an escapable calming dialog improve accessibility.

## Preview or host

Keep `index.html`, `gentle.css` and `gentle.js` together. Serve the folder with
any static web server. For example, with Python installed:

```sh
python -m http.server 8000
```

Then open http://localhost:8000. Use HTTPS for a hosted version so microphone
recording is available. Deploy all three app files together, preserving the
existing site address to retain access to that browser's existing entries.

The original database is upgraded in place from version 2 to version 3, adding
a drafts store. Entries aren't uploaded or synced to an account. Changing the
site address or browser does not transfer them; use backup and restore.

## Data and limitations

Entries live in IndexedDB in the current browser profile, not in this GitHub
repository. They are not encrypted by the app. Backups are unencrypted JSON
and can include sensitive text and audio. Keep backups private. Browser data
clearing can erase entries. There is no account, app lock or guaranteed offline
installation. Google Fonts is an external styling request; system fonts are the
fallback. Voice support varies by device/browser.

English and Amharic are included. New Amharic wording should be reviewed by
Noviye or another fluent speaker before broad distribution.

## Verification

With Node.js, Playwright and Microsoft Edge installed, run
`node tests/browser.cjs`. Screenshots and the temporary backup go into
`test-results/`. Set `PLAYWRIGHT_MODULE` to a bundled Playwright module path if
it is not installed locally. The test uses an isolated browser profile and
does not touch your everyday browser's entries.

Browser checks covered 320px and 390px mobile layouts and desktop, mood-only
saving, drafts after reload, stored entries, needs, tasks, backup export/restore,
deleting all entries, failed saves, midnight rollover, preservation of version-2
entries and audio, language/theme switching, and the calming dialog.

The app has been checked in desktop Microsoft Edge with simulated mobile
viewports. Physical-phone microphone permissions and Safari still need a
device check. This is a personal reflection tool, without clinical assessment.
