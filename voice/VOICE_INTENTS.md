# Voice & multimodal intents

Visual tokens don't apply to Siri, Shortcuts, Alexa, or CarPlay. **Intent schemas + utterance copy** are the design system here.

## Rules

1. Same entity names as `ENTITY_NAMES.md`
2. Same error shape as `COPY_STANDARDS.md` (spoken: short, actionable)
3. No PII in spoken confirmations ("Meal logged" not "Logged pasta at 7:42 PM with location")

## Tasteful iOS (implemented)

| Intent | User phrase (examples) | Spoken / compact result |
|--------|------------------------|-------------------------|
| Meal suggestion | "What should I eat?" | Opens in-app recommendation — avoid stacking dialogs |
| Log meal | "Log a meal" | Opens unified add sheet |
| Favorites | "Show favorite meals" | Navigates to Meals (favorites) |

Reference: `PRODUCT_BRIEF.md` → Siri & App Shortcuts

## Future surfaces

| Surface | Design artifact |
|---------|-----------------|
| **watchOS** | Subset of foundation spacing; large tap targets; glances not forms |
| **tvOS** | Focus-engine lists; 10-foot type scale multiplier |
| **CarPlay** | Template lists only — pattern doc, no custom chrome |
| **Alexa / Google** | Skill manifest + utterance table in this folder per app |

## Template: new voice intent

```markdown
### Intent: [Name]
- **Entities:** (from ENTITY_NAMES.md)
- **Utterances:** …
- **Success:** …
- **Failure:** …
- **Opens app?** yes/no/deep link
```

Add a row here before shipping any new shortcut or voice skill.
