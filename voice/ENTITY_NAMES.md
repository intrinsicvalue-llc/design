# Entity names — locked terminology

Never blur these in UI, SQL, docs, or voice interfaces.

## Keystone (operator console)

| Term | Who | UI label |
|------|-----|----------|
| **Operator** | `@intrinsicvalue.llc` staff | Platform → Operators |
| **User** | Tasteful end customer | Operate → People → User detail |
| **Household** | Shared billing / meal group | Operate → Households → Household detail |

| Say | Don't say |
|-----|-----------|
| Operator sign-in | Admin login, Keystone user |
| User detail page | User 360, customer 360 |
| People (list) | Users (ambiguous with auth.users) |

Source: `docs/KEYSTONE.md` (keystone repo)

## Tasteful (consumer app)

| Term | Meaning |
|------|---------|
| **Meal** | A logged eating occasion (may link recipe/restaurant) |
| **Recipe** | Saved recipe content (imported or manual) |
| **Restaurant** | A place in your library |
| **Household** | Shared group (billing + collaboration) |
| **Reader Mode** | In-app calm recipe reading view |

## Cross-platform voice (Siri, Alexa, future)

Use the same nouns in spoken responses as on-screen labels. See `VOICE_INTENTS.md`.

## Company layer

| Context | Name |
|---------|------|
| Legal / footer | Intrinsic Value LLC |
| Operator email domain | `@intrinsicvalue.llc` |
| Product domains | `tasteful.to`, `keystone.intrinsicvalue.llc` |

Products are **not** prefixed with "Intrinsic" in consumer UI.
