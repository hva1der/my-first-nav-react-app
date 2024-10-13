# NAV Kontrollnotat

- Aims to make a simple interface for workers at NAV to record important info where clients meet bi-annualy to control certain aspects of their benefit entitlement.

## Main functions

- Check for important changes to client circumstances, and highlights appropriate actions to staff.
- Autocompile letters

## Known issues (deliberately postponed)

- Not implemented functionality to cross-check for related issues when changing inputs - namely when changing
  effectiveDate
- Tasks button coloring function is only returning red or grey/default (in Tasks.js). Missing functionality for
  non-terminal or resolved issues color coding
- CSS in Tasks.module.css is affecting css in the rest of the app (namely button and certain input styling)
- Issue checkers for institutions, passport, financialAid are placeholders, issues not handled

## Possible issues

- Not tested if 2 % rounding is working correctly

## Issues not (currently) causing errors

- Input for Savings taken as string - could be handled better?
