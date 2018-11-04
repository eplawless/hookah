# hookah
Proof of concept implementation of React hooks for plain JS functions.

# but why?
The concept we're hoping to prove: these hooks are not subject to some of the current constraints on React hooks.

Rather than identifying a hook using the order it was called within a function Component, we use the line and column where it was called (pulled out of a synthetic stack trace).  This means you can invoke these hooks within branches or loops and they'll behave correctly.

# examples
